"use client";

import { useEffect, useRef } from "react";

// Pills and emoji that fall, pile up and can be thrown. Real DOM elements moved by
// Matter.js, so text stays crisp. A vertical swipe always scrolls the page (and makes
// the pile jump); a sideways grab picks a piece up. Nothing runs while off screen.
export interface PitItem {
  t?: string;
  emoji?: string;
  c?: string;
  f?: string;
}

const EMOJI_SIZE = 62;

export default function Pit({ items, phoneCount = 9, startInView = false, className = "" }: { items: PitItem[]; phoneCount?: number; startInView?: boolean; className?: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pieces = Array.from(el.querySelectorAll<HTMLElement>("[data-piece]"));
    const room = window.innerHeight < 720 ? phoneCount - 3 : phoneCount;
    const shown = window.innerWidth < 640 ? pieces.slice(0, room) : pieces;
    pieces.forEach((p) => { p.style.display = shown.includes(p) ? "" : "none"; });
    if (reduce) {
      el.classList.add("pit-still");
      return;
    }

    let raf = 0;
    let stopped = false;
    let cleanup = () => {};

    const begin = () => import("matter-js").then(({ default: Matter }) => {
      if (stopped) return;
      const { Engine, Bodies, Body, Composite } = Matter;
      const engine = Engine.create({ gravity: { x: 0, y: 1.25 } });
      const W = el.clientWidth;
      const H = el.clientHeight;
      const wall = { isStatic: true, friction: 0.6, restitution: 0.25 };
      Composite.add(engine.world, [
        Bodies.rectangle(W / 2, H + 40, W * 2, 80, wall),
        Bodies.rectangle(-40, H / 2, 80, H * 8, wall),
        Bodies.rectangle(W + 40, H / 2, 80, H * 8, wall),
      ]);

      const bodies = shown.map((piece, i) => {
        const w = piece.offsetWidth;
        const h = piece.offsetHeight;
        const x = w / 2 + Math.random() * Math.max(1, W - w);
        const y = -90 - i * 92;
        const round = piece.dataset.round === "1";
        const body = round
          ? Bodies.circle(x, y, w / 2, { restitution: 0.62, friction: 0.3, frictionAir: 0.006 })
          : Bodies.rectangle(x, y, w, h, { chamfer: { radius: h / 2 - 1 }, restitution: 0.34, friction: 0.45, frictionAir: 0.008, angle: (Math.random() - 0.5) * 0.9 });
        Composite.add(engine.world, body);
        piece.style.visibility = "visible";
        return { piece, body, w, h };
      });

      // Grab and throw.
      let held: { body: Matter.Body; dx: number; dy: number; x: number; y: number; vx: number; vy: number } | null = null;
      const toLocal = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
      };
      const down = (e: PointerEvent) => {
        const target = (e.target as HTMLElement).closest<HTMLElement>("[data-piece]");
        const hit = target && bodies.find((b) => b.piece === target);
        if (!hit) return;
        hit.piece.setPointerCapture(e.pointerId);
        hit.piece.classList.add("piece-held");
        const p = toLocal(e);
        held = { body: hit.body, dx: hit.body.position.x - p.x, dy: hit.body.position.y - p.y, x: p.x, y: p.y, vx: 0, vy: 0 };
      };
      const move = (e: PointerEvent) => {
        const p = toLocal(e);
        if (held) {
          held.vx = p.x - held.x;
          held.vy = p.y - held.y;
          held.x = p.x;
          held.y = p.y;
          return;
        }
        // A mouse pushes the pieces around just by passing through them.
        if (e.pointerType !== "mouse") return;
        for (const { body } of bodies) {
          const dx = body.position.x - p.x;
          const dy = body.position.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 110 && d > 1) {
            Body.applyForce(body, body.position, { x: (dx / d) * 0.0018 * body.mass, y: (dy / d) * 0.0026 * body.mass });
          }
        }
      };
      const up = () => {
        if (!held) return;
        Body.setVelocity(held.body, { x: held.vx * 1.15, y: held.vy * 1.15 });
        Body.setAngularVelocity(held.body, held.vx * 0.012);
        bodies.forEach((b) => b.piece.classList.remove("piece-held"));
        held = null;
      };
      el.addEventListener("pointerdown", down);
      window.addEventListener("pointermove", move, { passive: true });
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);

      // Scrolling kicks the pile into the air.
      let onScreen = true;
      let lastY = window.scrollY;
      const onScroll = () => {
        const delta = window.scrollY - lastY;
        lastY = window.scrollY;
        if (!onScreen || Math.abs(delta) < 6) return;
        const kick = Math.min(Math.abs(delta) * 0.16, 9);
        for (const { body } of bodies) {
          if (body === held?.body) continue;
          Body.setVelocity(body, { x: body.velocity.x + (Math.random() - 0.5) * kick * 0.5, y: body.velocity.y - kick * (0.6 + Math.random() * 0.6) });
          Body.setAngularVelocity(body, body.angularVelocity + (Math.random() - 0.5) * 0.05);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });

      const io = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; });
      io.observe(el);

      let last = performance.now();
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (!onScreen) { last = now; return; }
        const dt = Math.min(now - last, 16.6);
        last = now;
        if (held) {
          Body.setPosition(held.body, { x: held.x + held.dx, y: held.y + held.dy });
          Body.setVelocity(held.body, { x: 0, y: 0 });
          Body.setAngularVelocity(held.body, 0);
        }
        Engine.update(engine, dt);
        for (const { piece, body, w, h } of bodies) {
          piece.style.transform = `translate3d(${body.position.x - w / 2}px, ${body.position.y - h / 2}px, 0) rotate(${body.angle}rad)`;
        }
      };
      raf = requestAnimationFrame(frame);

      cleanup = () => {
        io.disconnect();
        el.removeEventListener("pointerdown", down);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
        window.removeEventListener("scroll", onScroll);
        Engine.clear(engine);
      };
    });

    let timer: ReturnType<typeof setTimeout> | undefined;
    let waiting: IntersectionObserver | null = null;
    if (startInView) {
      waiting = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          waiting?.disconnect();
          begin();
        }
      }, { threshold: 0.3 });
      waiting.observe(el);
    } else {
      // After the headline has painted: the pile is a treat, not the first thing to load.
      timer = setTimeout(begin, 500);
    }

    return () => {
      stopped = true;
      clearTimeout(timer);
      waiting?.disconnect();
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, [phoneCount, startInView]);

  return (
    <div ref={box} className={`pit ${className}`} aria-hidden="true">
      {items.map((p, i) =>
        p.emoji ? (
          <span key={i} data-piece data-round="1" data-cursor="Throw" className="piece piece-emoji" style={{ width: EMOJI_SIZE, height: EMOJI_SIZE }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/emoji/${p.emoji}.svg`} alt="" width={EMOJI_SIZE} height={EMOJI_SIZE} draggable={false} loading="lazy" decoding="async" />
          </span>
        ) : (
          <span key={i} data-piece data-cursor="Throw" className="piece pill" style={{ background: p.c, color: p.f }}>{p.t}</span>
        ),
      )}
    </div>
  );
}

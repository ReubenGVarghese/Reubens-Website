import gsap from "gsap";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

function randomChar() {
  return CHARSET[(Math.random() * CHARSET.length) | 0] ?? "X";
}

const TWEEN_KEY = "__scrambleTween" as const;

/** Club-free scramble inspired by GSAP’s ScrambleText feel. */
export function scrambleElementText(
  el: HTMLElement,
  finalText: string,
  opts?: { duration?: number }
) {
  const duration = opts?.duration ?? 0.72;
  type ElWithTween = HTMLElement & { [TWEEN_KEY]?: gsap.core.Tween };
  const node = el as ElWithTween;
  node[TWEEN_KEY]?.kill();

  const state = { t: 0 };
  const tw = gsap.to(state, {
    t: 1,
    duration,
    ease: "power3.out",
    overwrite: "auto",
    onUpdate: () => {
      const p = state.t;
      let out = "";
      for (let i = 0; i < finalText.length; i++) {
        const revealPoint = (i + 0.35) / Math.max(1, finalText.length);
        if (p > revealPoint) {
          out += finalText[i];
        } else {
          out += finalText[i] === " " ? " " : randomChar();
        }
      }
      el.textContent = out;
    },
    onComplete: () => {
      el.textContent = finalText;
      if (node[TWEEN_KEY] === tw) delete node[TWEEN_KEY];
    },
  });

  node[TWEEN_KEY] = tw;
  return tw;
}

export function killScramble(el: HTMLElement | null) {
  if (!el) return;
  type ElWithTween = HTMLElement & { [TWEEN_KEY]?: gsap.core.Tween };
  const node = el as ElWithTween;
  node[TWEEN_KEY]?.kill();
  delete node[TWEEN_KEY];
}

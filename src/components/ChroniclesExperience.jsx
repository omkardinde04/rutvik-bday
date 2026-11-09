import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Play, RotateCcw } from 'lucide-react';
import '../styles/chronicles.css';

const CURTAIN_START_TIME = 0.55;
const CURTAIN_END_TIME = 8.9;
const POST_VIDEO_PAUSE_MS = 2000;

const episodes = [
  {
    title: 'A Boy from Rosario',
    description: 'A small city, a big dream, and the first steps of a once-in-a-generation journey.',
    artwork: 'rosario',
    artMark: 'ROSARIO'
  },
  {
    title: 'The Number 10',
    description: 'A new home, impossible expectations, and a talent that refused to stay quiet.',
    artwork: 'number',
    artMark: 'EL DIEZ'
  },
  {
    title: 'The Golden Generation',
    description: 'A country full of hope. A team of stars. The search for a moment that felt theirs.',
    artwork: 'generation',
    artMark: 'ALBICELESTE'
  },
  {
    title: 'A Nation Waiting',
    description: 'Setbacks tested the dream. The captain kept coming back for one more chance.',
    artwork: 'waiting',
    artMark: 'THE CAPTAIN'
  },
  {
    title: 'The Final',
    description: 'One last match. One last mountain to climb. A whole nation holding its breath.',
    artwork: 'final',
    artMark: 'ONE LAST MATCH'
  },
  {
    title: 'World Champions',
    description: 'The world watched as Argentina completed a story years in the making.',
    artwork: 'champions',
    artMark: 'QATAR · 2022'
  },
  {
    title: 'The Legacy',
    description: 'Beyond the trophies: the joy, the resilience, and the game that brought us together.',
    artwork: 'legacy',
    artMark: 'THE LEGACY'
  }
];

export default function ChroniclesExperience() {
  const [phase, setPhase] = useState('curtain');
  const [videoError, setVideoError] = useState(false);
  const [curtainAttempt, setCurtainAttempt] = useState(0);
  const [messiAttempt, setMessiAttempt] = useState(0);
  const curtainTransitionedRef = useRef(false);
  const pauseTimeoutRef = useRef(null);
  const messageRef = useRef(null);
  const titleStageRef = useRef(null);
  const titleRef = useRef(null);
  const titleSweepRef = useRef(null);
  const chroniclesPageRef = useRef(null);
  const episodeHeaderRef = useRef(null);
  const episodeGridRef = useRef(null);

  const advanceToMessage = () => {
    if (curtainTransitionedRef.current) return;
    curtainTransitionedRef.current = true;
    setVideoError(false);
    setPhase('message');
  };

  const handleCurtainMetadata = (event) => {
    const video = event.currentTarget;
    if (video.duration > CURTAIN_END_TIME && video.currentTime < CURTAIN_START_TIME) {
      video.currentTime = CURTAIN_START_TIME;
    }
  };

  const handleCurtainTimeUpdate = (event) => {
    if (event.currentTarget.currentTime >= CURTAIN_END_TIME) {
      event.currentTarget.pause();
      advanceToMessage();
    }
  };

  const handleMessiEnded = () => {
    if (pauseTimeoutRef.current !== null) return;
    setVideoError(false);
    setPhase('pause');
    pauseTimeoutRef.current = window.setTimeout(() => {
      pauseTimeoutRef.current = null;
      setPhase('title');
    }, POST_VIDEO_PAUSE_MS);
  };

  useLayoutEffect(() => {
    if (phase !== 'message') return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      gsap.timeline({ onComplete: () => setPhase('messi') })
        .fromTo(messageRef.current, {
          autoAlpha: 0,
          scale: 0.92,
          y: 22
        }, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: prefersReducedMotion ? 0.01 : 1.1,
          ease: 'power3.out'
        })
        .to({}, { duration: 2.25 })
        .to(messageRef.current, {
          autoAlpha: 0,
          scale: 1.035,
          y: -10,
          duration: prefersReducedMotion ? 0.01 : 1,
          ease: 'power2.inOut'
        });
    }, messageRef);

    return () => context.revert();
  }, [phase]);

  useLayoutEffect(() => {
    if (phase !== 'title') return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      const entranceDuration = prefersReducedMotion ? 0.01 : 1.25;
      const sweepDuration = prefersReducedMotion ? 0.01 : 1.2;
      gsap.timeline({ onComplete: () => setPhase('episodes') })
        .fromTo(titleRef.current, {
          autoAlpha: 0,
          scale: 0.82,
          y: 28
        }, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: entranceDuration,
          ease: 'power4.out'
        })
        .fromTo(titleSweepRef.current, {
          xPercent: -130,
          autoAlpha: 0
        }, {
          xPercent: 130,
          autoAlpha: 0.9,
          duration: sweepDuration,
          ease: 'power2.inOut'
        }, prefersReducedMotion ? 0 : 0.45)
        .to({}, { duration: prefersReducedMotion ? 0.01 : 0.9 });
    }, titleStageRef);

    return () => context.revert();
  }, [phase]);

  useLayoutEffect(() => {
    if (phase !== 'episodes') return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray('.episode-card', episodeGridRef.current);
      gsap.timeline()
        .fromTo(episodeHeaderRef.current, {
          autoAlpha: 0,
          y: 18
        }, {
          autoAlpha: 1,
          y: 0,
          duration: prefersReducedMotion ? 0.01 : 0.65,
          ease: 'power2.out'
        })
        .fromTo(cards, {
          autoAlpha: 0,
          y: 26
        }, {
          autoAlpha: 1,
          y: 0,
          duration: prefersReducedMotion ? 0.01 : 0.65,
          stagger: prefersReducedMotion ? 0 : 0.16,
          ease: 'power2.out',
          clearProps: 'opacity,transform'
        }, prefersReducedMotion ? 0 : '-=0.18');
    }, chroniclesPageRef);

    return () => context.revert();
  }, [phase]);

  useEffect(() => () => {
    if (pauseTimeoutRef.current !== null) {
      window.clearTimeout(pauseTimeoutRef.current);
    }
  }, []);

  const retryVideo = () => {
    setVideoError(false);
    if (phase === 'curtain') {
      curtainTransitionedRef.current = false;
      setCurtainAttempt((currentAttempt) => currentAttempt + 1);
    } else {
      setMessiAttempt((currentAttempt) => currentAttempt + 1);
    }
  };

  if (phase === 'episodes') {
    return (
      <section className="chronicles-page" aria-labelledby="chronicles-title" ref={chroniclesPageRef}>
        <div className="chronicles-noise" aria-hidden="true" />
        <div className="chronicles-content">
          <header className="chronicles-heading" ref={episodeHeaderRef}>
            <p className="chronicles-eyebrow">
              <span className="chronicles-eyebrow-line" />
              A seven-part football story
            </p>
            <h1 id="chronicles-title">THE RUTVIK <span>CHRONICLES</span></h1>
            <p className="chronicles-intro">
              One game. A thousand memories. The moments that make a legend.
            </p>
          </header>

          <div className="episode-grid" ref={episodeGridRef}>
            {episodes.map((episode, index) => (
              <article className="episode-card" key={episode.title}>
                <div className={`episode-art episode-art--${episode.artwork}`}>
                  <div className="episode-art-light" />
                  <span className="episode-art-mark" aria-hidden="true">{episode.artMark}</span>
                  <img src="/assets/intro/football-reference.png" alt="" />
                  <span className="episode-art-index">{String(index + 1).padStart(2, '0')}</span>
                </div>

                <div className="episode-details">
                  <div className="episode-meta">
                    <span>EPISODE {String(index + 1).padStart(2, '0')}</span>
                    <span className="episode-meta-dot" />
                    <span>THE JOURNEY</span>
                  </div>
                  <h2>{episode.title}</h2>
                  <p>{episode.description}</p>
                  <button
                    className="episode-play-button"
                    type="button"
                    disabled
                    aria-label={`Play episode ${index + 1}: ${episode.title}. Video coming soon.`}
                    title="Episode video coming soon"
                  >
                    <Play size={14} fill="currentColor" />
                    <span>Play episode</span>
                    <ArrowRight className="episode-play-arrow" size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <footer className="chronicles-footer">
            <span>RUTVIK FC</span>
            <span className="chronicles-footer-rule" />
            <span>THE BEAUTIFUL GAME, TOLD OUR WAY</span>
          </footer>
        </div>
      </section>
    );
  }

  if (phase === 'title') {
    return (
      <section className="chronicles-title-stage" ref={titleStageRef} aria-label="The Rutvik Chronicles">
        <div className="chronicles-title-lockup">
          <span className="chronicles-title-kicker">A RUTVIK FC ORIGINAL</span>
          <h1 className="chronicles-title-wordmark" ref={titleRef}>
            <span>THE RUTVIK</span>
            <span>CHRONICLES</span>
          </h1>
          <span className="chronicles-title-sweep" ref={titleSweepRef} aria-hidden="true" />
        </div>
      </section>
    );
  }

  if (phase === 'pause') {
    return <section className="chronicles-pause-stage" aria-label="A moment of silence" />;
  }

  const isCurtain = phase === 'curtain';
  const isMessage = phase === 'message';
  const isMessi = phase === 'messi';

  return (
    <section className="chronicles-video-stage chronicles-video-stage--curtain">
      <video
        key={`curtain-${curtainAttempt}`}
        className="curtain-video"
        src="/assets/intro/curtain-opening.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-label="Stadium curtain-opening video"
        onLoadedMetadata={handleCurtainMetadata}
        onTimeUpdate={handleCurtainTimeUpdate}
        onEnded={advanceToMessage}
        onError={() => setVideoError(true)}
      />

      <div className="curtain-film-grain" aria-hidden="true" />
      <div className="curtain-watermark-detail" aria-hidden="true" />

      {isMessage && (
        <div className="messi-reveal">
          <h1 className="messi-reveal-title" ref={messageRef}>
            LET&apos;S RELIVE THE BEST MOMENT OF YOUR LIFE.
          </h1>
        </div>
      )}

      {isMessi && (
        <div className="messi-reveal">
          <div className="messi-feature-frame">
            <video
              key={`messi-${messiAttempt}`}
              className="messi-feature-video"
              src="/assets/intro/messi-feature.mp4"
              autoPlay
              muted
              playsInline
              controls
              preload="auto"
              aria-label="Messi World Cup victory video"
              onEnded={handleMessiEnded}
              onError={() => setVideoError(true)}
            />
          </div>
        </div>
      )}

      {videoError && (
        <div className="video-error-panel" role="alert">
          <p>THIS VIDEO COULDN&apos;T BE PLAYED</p>
          <span>Check the video file and try again, or continue to the next chapter.</span>
          <div className="video-error-actions">
            <button type="button" onClick={retryVideo}>
              <RotateCcw size={15} /> Try again
            </button>
            <button type="button" onClick={isCurtain ? advanceToMessage : handleMessiEnded}>
              Continue <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

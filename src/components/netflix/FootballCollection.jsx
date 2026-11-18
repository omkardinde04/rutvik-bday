import React from 'react';
import { Trophy, Play, Shield, Sparkles, Flame, Activity } from 'lucide-react';
import { ALL_VIDEOS } from '../../data/videoCatalog';

export default function FootballCollection({ onPlayEpisode, onOpenStadium }) {
  const footballVideos = ALL_VIDEOS.filter((v) => v.section === 'football-collection');

  const stats = [
    { label: 'Pace (Running for Biryani)', value: '99' },
    { label: 'Shooting (Clutch Decisions)', value: '99' },
    { label: 'Passing (Aux Cord Aux MVP)', value: '98' },
    { label: 'Dribbling (Dodging Bad Vibes)', value: '100' },
    { label: 'Physical (Gym Dedication)', value: '99' },
    { label: 'Charisma (Squad Captain)', value: '100' },
  ];

  return (
    <section className="nf-goat-section" id="football-spotlight" aria-label="The Football Collection & Tribute">
      <div className="nf-goat-card">
        <div className="nf-goat-floodlight" aria-hidden="true" />

        {/* Left Column: Tactical Tribute Info */}
        <div>
          <div className="nf-goat-kicker">
            <Trophy size={16} />
            <span>SPECIAL MATCHDAY TRIBUTE • #10 CAM</span>
          </div>

          <h2 className="nf-goat-title">
            THE GREATEST OF ALL TIME
          </h2>

          <p className="nf-goat-desc">
            Whether controlling the midfield on turf nights or anchoring the crew off the pitch, Captain Rutvik remains undefeated in energy, vision, and loyalty. Unstoppable since Day 1.
          </p>

          {/* Tactical Custom Stats Grid */}
          <div className="nf-goat-stats">
            {stats.map((s) => (
              <div className="nf-goat-stat-box" key={s.label}>
                <div className="nf-goat-stat-val">{s.value}</div>
                <div className="nf-goat-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Action Triggers */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem' }}>
            <button
              type="button"
              className="nf-btn-play"
              onClick={() => onPlayEpisode(footballVideos[0])}
            >
              <Play size={18} fill="#141414" />
              <span>WATCH PLAYMAKER REEL</span>
            </button>

            <button
              type="button"
              className="nf-btn-info"
              onClick={onOpenStadium}
              title="Experience full 3D interactive ball and matchday stadium"
            >
              <Shield size={18} color="#10b981" />
              <span>OPEN 3D STADIUM HUD</span>
            </button>
          </div>
        </div>

        {/* Right Column: AI Football Image Showcase */}
        <div className="nf-goat-image-wrap">
          <img
            className="nf-goat-image"
            src="/assets/intro/football.png"
            alt="Rutvik AI Football Matchday Legend"
          />
        </div>
      </div>
    </section>
  );
}


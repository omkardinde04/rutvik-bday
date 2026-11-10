import React, { useState } from 'react';
import { Heart, MessageSquare, Sparkles } from 'lucide-react';
import { FRIEND_MESSAGES } from '../../data/friendsCredits';

export default function FriendshipWall() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [likedIds, setLikedIds] = useState({});

  const categories = ['All', 'The Boys', 'Family Collection', 'College Friends', 'Long Distance Wishes'];

  const filteredMessages =
    selectedFilter === 'All'
      ? FRIEND_MESSAGES
      : FRIEND_MESSAGES.filter((msg) => msg.category === selectedFilter);

  const toggleLike = (id) => {
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="nf-wall-section" id="friendship-wall" aria-label="Friendship & Family Wall">
      <div className="nf-wall-header">
        <div>
          <h2 className="nf-wall-title">FRIENDSHIP & FAMILY WALL</h2>
          <p className="nf-wall-subtitle">
            Personal notes, inside jokes, and birthday wishes from your crew across the globe
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`nf-filter-pill ${selectedFilter === cat ? 'active' : ''}`}
              onClick={() => setSelectedFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="nf-wall-grid">
        {filteredMessages.map((msg) => {
          const isLiked = Boolean(likedIds[msg.id]);
          return (
            <article className="nf-message-card" key={msg.id}>
              <div>
                <div className="nf-msg-top">
                  <div className="nf-msg-avatar" style={{ background: msg.avatarColor }}>
                    {msg.avatarText}
                  </div>
                  <div>
                    <div className="nf-msg-author">{msg.author}</div>
                    <div className="nf-msg-role">{msg.role}</div>
                  </div>
                </div>

                <p className="nf-msg-text">“{msg.message}”</p>
              </div>

              <div className="nf-msg-footer">
                <span>{msg.category} • {msg.timestamp}</span>
                <button
                  type="button"
                  className={`nf-like-btn ${isLiked ? 'liked' : ''}`}
                  onClick={() => toggleLike(msg.id)}
                  aria-label={`Love message from ${msg.author}`}
                >
                  <Heart size={15} fill={isLiked ? '#E50914' : 'none'} />
                  <span>{isLiked ? 'Loved' : 'Send Love'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}


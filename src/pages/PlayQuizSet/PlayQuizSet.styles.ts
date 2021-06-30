import React from 'react';

export const defaultAnswersContainerStyle: React.CSSProperties = {
  display: 'flex',
  borderRadius: 'var(--space-xs)',
  padding: 'var(--space-md) var(--space-sm)',
  flexWrap: 'wrap',
};

export const defaultOptionStyles: React.CSSProperties = {
  transition: 'all 0.2s ease-in-out',
  padding: 'var(--space-sm) var(--space-xs)',
  margin: '0 auto',
  borderRadius: 'var(--space-xs)',
  cursor: 'pointer',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
  /**FOR GRID */
  width: '48%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 'var(--space-sm)',
  fontWeight: 600,
};

export const defaultOptionSerialAlphabetStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 'var(--space-sm)',
  backgroundColor: 'var(--dark)',
  height: '2rem',
  width: '2rem',
  borderRadius: '50%',
  color: 'var(--light)',
};

export const defaultSelectedOptionIconStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '2rem',
  width: '2rem',
  borderRadius: '50%',
  color: 'var(--light)',
  fontSize: 'var(--text-lg)',
};

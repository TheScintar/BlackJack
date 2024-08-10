"use client";

import React from 'react';
import styles from '../styles/ActionButtons.module.css';

const ActionButtons = ({ onHit, onStand }) => {
  return (
    <div className={styles.actionButtons}>
      <button onClick={onHit} className={styles.button}>Hit</button>
      <button onClick={onStand} className={styles.button}>Stand</button>
    </div>
  );
};

export default ActionButtons;

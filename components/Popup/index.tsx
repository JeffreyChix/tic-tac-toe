import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/popup.module.scss";
import assistantImage from "@/assets/images/assistant.png";

import { SEO } from "@/components/Seo";

import { TicTacToeGame } from "../TicTacToeGame";

export const Popup = () => {
  return (
    <>
      <SEO
        page="Play Tic-Tac-Toe By Jeffrey"
        description="Play Tic-Tac-Toe with my Assistant. Let's see if you can beat the logic!"
      />

      <div className={styles.popup}>
        <div className={styles.playgame}>
          <TicTacToeGame />
        </div>
      </div>
    </>
  );
};

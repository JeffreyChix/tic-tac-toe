import cx from "clsx";

export function getPosition(index: number) {
  switch (index) {
    case 0:
      return "top left";
    case 1:
      return "top";
    case 2:
      return "top right";
    case 3:
      return "left";
    case 5:
      return "right";
    case 6:
      return "bottom left";
    case 7:
      return "bottom";
    case 8:
      return "bottom right";
    default:
      return "";
  }
}

export function SquareTile({
  position,
  onClick,
  symbol,
  className,
}: {
  position: string;
  onClick: () => void;
  className?: string;
  symbol: any;
}) {
  return (
    <div
      className={cx("square", className, position)}
      tabIndex={0}
      onClick={onClick}
    >
      <div
        className={typeof symbol === "string" ? symbol.toLowerCase() : ""}
      ></div>
      <style jsx>{`
        .square {
          float: left;
          width: 33.333333333%;
          height: 33.333333333%;
          border-width: 5px;
          border-color: var(--white-color);
          outline: none !important;
          -webkit-transition: background-color 0.1s;
          -moz-transition: background-color 0.1s;
          transition: background-color 0.1s;
          will-change: background-color, border-color;
          cursor: pointer;
        }
        .square.top {
          border-bottom-style: solid;
        }
        .square.left {
          clear: both;
          border-right-style: solid;
        }
        .square.right {
          border-left-style: solid;
        }
        .square.bottom {
          border-top-style: solid;
        }

        .square .x,
        .square .o {
          position: relative;
          will-change: transform;
          -webkit-transform: translate3d(0, 0, 0);
          transform: translate3d(0, 0, 0);
          -webkit-animation: appear 0.2s cubic-bezier(0.5, 1.8, 0.1, 1.1);
          -moz-animation: appear 0.2s cubic-bezier(0.5, 1.8, 0.1, 1.1);
          animation: appear 0.2s cubic-bezier(0.5, 1.8, 0.1, 1.1);
        }
        .square .o {
          left: 16.666666667%;
          top: 16.666666667%;
          width: 66.666666667%;
          height: 66.666666667%;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          border: 20px solid var(--white-color);
        }

        .square .x {
          width: 100%;
          height: 100%;
        }

        .square .x::before,
        .square .x::after {
          position: absolute;
          content: "";
          display: block;
          background-color: var(--white-color);
          left: 90px;
          top: 20px;
          width: 20px;
          height: 160px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
        }

        .square .x::before {
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }
        .square .x::after {
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          transform: rotate(45deg);
        }

        .square.board-tie {
          -webkit-animation: border-blink 0.3s steps(1) 3;
          -moz-animation: border-blink 0.3s steps(1) 3;
          animation: border-blink 0.3s steps(1) 3;
        }

        .square.board-tie > div,
        .square.board-win:not(.win) > div {
          opacity: 0.5;
        }

        .square.board-win.win > div {
          -webkit-animation: blink 0.3s steps(1) 3;
          -moz-animation: blink 0.3s steps(1) 3;
          animation: blink 0.3s steps(1) 3;
        }

        @keyframes appear {
          0% {
            transform: scale(0.3);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes blink {
          50% {
            visibility: hidden;
          }
        }

        @keyframes border-blink {
          50% {
            border-color: var(--primary-dark-color);
          }
        }

        @media (max-width: 960px), (max-height: 800px) {
          .square {
            border-width: 4px;
          }
          .square .x::before,
          .square .x::after {
            left: 67.5px;
            top: 16px;
            width: 15px;
            height: 118px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
        }
        @media (max-width: 540px), (max-height: 630px) {
          .square {
            border-width: 3px;
          }
          .square .x::before,
          .square .x::after {
            left: 45px;
            top: 13px;
            width: 10px;
            height: 74px;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
          }
        }
      `}</style>
    </div>
  );
}

export function playSound(path: string) {
  const audio = new Audio(path);
  audio.play();
}

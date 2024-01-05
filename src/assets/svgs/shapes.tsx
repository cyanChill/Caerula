export function Rocket({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    </svg>
  );
}

export function Waves({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        d="M7.69218 51.2826C13.0556 51.2826 15.3455 52.8088 18.8108 55.1189C23.1011 57.9791 28.44 61.5392 38.4609 61.5392C48.4822 61.5392 53.8214 57.9794 58.1113 55.1189C61.5757 52.8088 63.8652 51.2833 69.227 51.2833C74.5901 51.2833 76.879 52.8094 80.3444 55.1189C84.6352 57.9797 89.9742 61.5392 99.9964 61.5392C110.017 61.5392 115.357 57.9794 119.648 55.1189C123.112 52.8091 125.402 51.2833 130.765 51.2833C136.129 51.2833 138.419 52.8094 141.885 55.1196C146.176 57.9797 151.515 61.5399 161.537 61.5399C171.558 61.5399 176.898 57.9801 181.188 55.1196C184.654 52.8094 186.944 51.2833 192.308 51.2833C196.556 51.2833 200 47.8392 200 43.5911C200 39.3427 196.556 35.8983 192.308 35.8983C182.285 35.8983 176.945 39.4581 172.654 42.3186C169.189 44.6287 166.9 46.1542 161.537 46.1542C156.173 46.1542 153.884 44.628 150.418 42.3179C146.128 39.4578 140.788 35.8976 130.765 35.8976C120.744 35.8976 115.404 39.4574 111.113 42.3179C107.649 44.628 105.359 46.1542 99.9964 46.1542C94.6323 46.1542 92.3431 44.628 88.8777 42.3179C84.5875 39.4578 79.2473 35.8976 69.2267 35.8976C59.2054 35.8976 53.8662 39.4574 49.5763 42.3179C46.1119 44.628 43.8224 46.1535 38.4606 46.1535C33.0988 46.1535 30.8089 44.6274 27.3449 42.3179C23.054 39.4571 17.7144 35.897 7.69218 35.897C3.4438 35.898 0 39.3421 0 43.5905C0 47.8388 3.4438 51.2826 7.69218 51.2826ZM192.308 87.1801C182.286 87.1801 176.946 90.74 172.655 93.6004C169.19 95.9106 166.9 97.4361 161.538 97.4361C156.174 97.4361 153.884 95.9099 150.419 93.5998C146.128 90.7396 140.788 87.1795 130.766 87.1795C120.745 87.1795 115.405 90.7393 111.114 93.5998C107.649 95.9096 105.36 97.4354 99.997 97.4354C94.633 97.4354 92.3438 95.9093 88.8784 93.5991C84.5882 90.739 79.248 87.1788 69.2273 87.1788C59.2061 87.1788 53.8668 90.7387 49.577 93.5991C46.1126 95.9093 43.823 97.4348 38.4612 97.4348C33.0995 97.4348 30.8096 95.9086 27.3455 93.5991C23.0546 90.739 17.7151 87.1788 7.69284 87.1788C3.4438 87.1801 0 90.6243 0 94.8723C0 99.1207 3.4438 102.565 7.69218 102.565C13.0556 102.565 15.3455 104.091 18.8108 106.401C23.1011 109.261 28.44 112.821 38.4609 112.821C48.4822 112.821 53.8214 109.261 58.1113 106.401C61.5757 104.091 63.8652 102.565 69.227 102.565C74.5901 102.565 76.879 104.091 80.3444 106.401C84.6352 109.262 89.9742 112.821 99.9964 112.821C110.017 112.821 115.357 109.261 119.648 106.401C123.112 104.091 125.402 102.565 130.765 102.565C136.129 102.565 138.419 104.091 141.885 106.401C146.176 109.261 151.515 112.821 161.537 112.821C171.558 112.821 176.898 109.262 181.188 106.401C184.654 104.091 186.944 102.565 192.308 102.565C196.556 102.565 200 99.1204 200 94.8723C200.001 90.6243 196.557 87.1801 192.308 87.1801ZM192.308 138.462C182.286 138.462 176.946 142.022 172.655 144.883C169.19 147.193 166.9 148.719 161.538 148.719C156.174 148.719 153.884 147.193 150.419 144.883C146.128 142.022 140.788 138.462 130.766 138.462C120.745 138.462 115.405 142.022 111.114 144.883C107.649 147.192 105.36 148.719 99.997 148.719C94.633 148.719 92.3438 147.193 88.8784 144.883C84.5882 142.022 79.248 138.462 69.2273 138.462C59.2061 138.462 53.8668 142.022 49.577 144.883C46.1126 147.193 43.823 148.719 38.4612 148.719C33.0995 148.719 30.8096 147.193 27.3455 144.883C23.0546 142.022 17.7151 138.462 7.69284 138.462C3.4438 138.462 0 141.906 0 146.155C0 150.403 3.4438 153.847 7.69218 153.847C13.0556 153.847 15.3455 155.374 18.8108 157.684C23.1011 160.544 28.44 164.104 38.4609 164.104C48.4822 164.104 53.8214 160.544 58.1113 157.684C61.5757 155.374 63.8652 153.848 69.227 153.848C74.5901 153.848 76.879 155.374 80.3444 157.684C84.6352 160.544 89.9742 164.104 99.9964 164.104C110.017 164.104 115.357 160.544 119.648 157.684C123.112 155.374 125.402 153.847 130.765 153.847C136.129 153.847 138.419 155.374 141.885 157.684C146.176 160.544 151.515 164.103 161.537 164.103C171.558 164.103 176.898 160.544 181.188 157.684C184.654 155.374 186.944 153.847 192.308 153.847C196.556 153.847 200 150.403 200 146.155C200.001 141.906 196.557 138.462 192.308 138.462Z"
      />
    </svg>
  );
}

export function Tiles({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 413"
      fill="none"
      className={className}
    >
      <path
        d="M0.0018118 235.381L0.998397 85.3896C1.1788 58.2384 20.1604 34.9786 46.3782 29.7819L191.213 1.07354C226.018 -5.8253 258.315 21.4078 258.077 57.4519L257.079 207.443C256.899 234.594 237.918 257.854 211.701 263.051L66.865 291.759C32.06 298.658 -0.237673 271.425 0.0018118 235.381Z"
        fill="white"
        fillOpacity="0.2"
      />
      <path
        d="M70.9627 295.193L71.9592 145.202C72.1397 118.051 91.1212 94.7911 117.339 89.5944L262.175 60.886C296.98 53.9873 329.277 81.2203 329.037 117.264L328.041 267.256C327.861 294.407 308.878 317.667 282.661 322.863L137.826 351.572C103.021 358.471 70.7232 331.237 70.9627 295.193Z"
        fill="white"
        fillOpacity="0.5"
      />
      <path
        d="M141.924 355.061L142.921 205.07C143.101 177.917 162.082 154.659 188.3 149.461L333.135 120.753C367.94 113.854 400.239 141.087 399.999 177.131L399.002 327.122C398.821 354.274 379.84 377.534 353.622 382.731L208.787 411.439C173.982 418.337 141.685 391.105 141.924 355.061Z"
        fill="white"
        fillOpacity="0.8"
      />
    </svg>
  );
}

export function CircleWaves({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        d="M7.74434 138.546C13.1905 94.0067 35.8916 79.7207 56.2185 67.0622C76.9746 54.131 94.9272 42.805 92.7675 0.250977C83.2995 0.927622 73.9774 2.95738 65.0852 6.27839C65.9884 40.0507 49.9899 50.0665 34.4653 59.7381C18.0687 69.9507 2.57991 79.6 1.60962 117.678C2.90632 124.926 4.96762 131.924 7.74434 138.546Z"
      />
      <path
        fill="currentColor"
        d="M29.7345 52.1456C44.2039 43.1269 55.9055 35.7491 56.1693 10.1192C29.8329 23.0281 9.98001 47.1779 2.875 76.2776C10.1678 64.3435 20.3044 58.0165 29.7345 52.1456ZM32.3771 173.593C35.9006 126.124 56.7282 109.558 76.9254 93.5192C98.8664 76.0988 119.6 59.5905 118.433 1.67725C112.91 0.650016 107.31 0.0891175 101.692 0.000488281C104.008 47.6698 82.1658 61.4327 60.9447 74.65C39.4464 88.0418 17.2594 101.943 15.5513 153.44C20.2563 160.863 25.913 167.638 32.3771 173.593ZM139.471 121.403C159.512 105.319 178.417 90.0092 177.406 36.6389C172.003 30.0627 165.789 24.1973 158.912 19.1827C158.631 77.4894 135.965 95.7147 113.998 113.341C93.3219 129.934 73.8044 145.633 72.3735 196.128C80.6188 198.498 89.2887 199.844 98.2494 200.005C100.606 152.729 120.329 136.771 139.471 121.403ZM173.06 142.262C158.707 151.008 146.258 158.676 144.81 189.43C172.331 175.6 192.618 149.452 198.395 118.246C191.947 130.739 182.168 136.713 173.06 142.262Z"
      />
      <path
        fill="currentColor"
        d="M168.41 134.629C183.782 125.257 198.77 116.395 197 75.2713C194.658 66.1134 191.021 57.3369 186.197 49.2077C184.082 96.9173 164.31 112.943 145.078 128.378C126.777 143.053 109.513 157.035 107.228 199.754C116.983 199.064 126.584 196.94 135.72 193.45C136.265 154.218 153.337 143.813 168.41 134.629ZM108.409 106.365C130.385 88.7346 151.15 72.0341 149.934 13.3339C142.853 9.24125 135.295 6.03648 127.43 3.79199C128.069 64.3344 104.907 82.7207 82.488 100.521C62.0717 116.73 42.8045 132.129 40.9668 180.657C47.9353 185.776 55.5391 189.968 63.5875 193.128C65.7963 140.701 87.4288 123.2 108.409 106.365Z"
      />
    </svg>
  );
}

export function SquareBricks({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      className={className}
    >
      <path
        fill="currentColor"
        d="M105.361 90.7388H94.6469C92.4895 90.7388 90.7407 92.4876 90.7407 94.645V105.359C90.7407 107.516 92.4895 109.265 94.6469 109.265H105.361C107.518 109.265 109.267 107.516 109.267 105.359V94.645C109.267 92.488 107.518 90.7388 105.361 90.7388ZM75.1157 30.2493H64.4016C62.2442 30.2493 60.4954 31.9981 60.4954 34.1556V44.8692C60.4954 47.0267 62.2442 48.7755 64.4016 48.7755H75.1157C77.2731 48.7755 79.0219 47.0267 79.0219 44.8692V34.1556C79.0219 31.9981 77.2731 30.2493 75.1157 30.2493ZM84.8891 169.755H105.361C107.518 169.755 109.267 168.006 109.267 165.849V124.89C109.267 122.733 107.518 120.984 105.361 120.984H64.4016C62.2442 120.984 60.4954 122.733 60.4954 124.89V165.848C60.4954 168.006 62.2442 169.754 64.4016 169.754H84.8813L84.8891 169.755ZM135.606 151.229H124.892C122.734 151.229 120.986 152.977 120.986 155.135V165.849C120.986 168.006 122.734 169.755 124.892 169.755H135.606C137.763 169.755 139.512 168.006 139.512 165.849V155.135C139.512 152.977 137.763 151.229 135.606 151.229ZM135.606 79.02C137.763 79.02 139.512 77.2712 139.512 75.1138V34.1556C139.512 31.9981 137.763 30.2493 135.606 30.2493H94.6469C92.4895 30.2493 90.7407 31.9981 90.7407 34.1556V75.1142C90.7407 77.2716 92.4895 79.0204 94.6469 79.0204H135.606V79.02ZM75.1157 109.265C77.2731 109.265 79.0219 107.516 79.0219 105.359V64.4001C79.0219 62.2427 77.2731 60.4939 75.1157 60.4939H34.1571C31.9997 60.4939 30.2508 62.2427 30.2508 64.4001V105.358C30.2508 107.516 31.9997 109.265 34.1571 109.265H75.1157V109.265ZM185.382 139.51H196.093C198.25 139.51 199.999 137.761 199.999 135.604V124.89C199.999 122.733 198.25 120.984 196.093 120.984H185.382C183.225 120.984 181.476 122.733 181.476 124.89V135.604C181.476 137.761 183.225 139.51 185.382 139.51ZM34.1571 139.51H44.8708C47.0282 139.51 48.777 137.761 48.777 135.604V124.89C48.777 122.733 47.0282 120.984 44.8708 120.984H34.1571C31.9997 120.984 30.2508 122.733 30.2508 124.89V135.604C30.2508 137.761 31.9997 139.51 34.1571 139.51ZM185.382 60.4942C183.225 60.4942 181.476 62.2431 181.476 64.4005V105.359C181.476 107.517 183.225 109.265 185.382 109.265H196.093C198.25 109.265 199.999 107.517 199.999 105.359V64.4005C199.999 62.2431 198.25 60.4942 196.093 60.4942H185.382ZM151.231 44.8692C151.231 47.0267 152.98 48.7755 155.137 48.7755H196.093C198.25 48.7755 199.999 47.0267 199.999 44.8692V3.90674C199.999 1.74932 198.25 0.000488281 196.093 0.000488281H155.137C152.98 0.000488281 151.231 1.74932 151.231 3.90674V44.8692ZM165.851 139.51C168.009 139.51 169.757 137.761 169.757 135.604V94.645C169.757 92.4876 168.009 90.7388 165.851 90.7388H124.892C122.734 90.7388 120.986 92.4876 120.986 94.645V135.604C120.986 137.761 122.734 139.51 124.892 139.51H165.851ZM14.6223 60.4942H3.90747C1.75005 60.4942 0.0012207 62.2431 0.0012207 64.4005V75.1142C0.0012207 77.2716 1.75005 79.0204 3.90747 79.0204H14.6223C16.7797 79.0204 18.5286 77.2716 18.5286 75.1142V64.4005C18.5286 62.2431 16.7797 60.4942 14.6223 60.4942ZM165.851 60.4942H155.137C152.98 60.4942 151.231 62.2431 151.231 64.4005V75.1142C151.231 77.2716 152.98 79.0204 155.137 79.0204H165.851C168.009 79.0204 169.757 77.2716 169.757 75.1142V64.4005C169.757 62.2431 168.008 60.4942 165.851 60.4942ZM60.4958 185.38V196.094C60.4958 198.252 62.2446 200 64.402 200H75.1161C77.2735 200 79.0223 198.252 79.0223 196.094V185.38C79.0223 183.222 77.2735 181.474 75.1161 181.474H64.402C62.2446 181.474 60.4958 183.222 60.4958 185.38ZM199.999 155.135C199.999 152.977 198.25 151.229 196.093 151.229H155.137C152.98 151.229 151.231 152.977 151.231 155.135V196.094C151.231 198.252 152.98 200 155.137 200H196.093C198.25 200 199.999 198.252 199.999 196.094V155.135ZM90.7407 185.381V196.094C90.7407 198.252 92.4895 200 94.6469 200H135.606C137.763 200 139.512 198.252 139.512 196.094V185.381C139.512 183.223 137.763 181.474 135.606 181.474H94.6469C92.4895 181.474 90.7407 183.223 90.7407 185.381ZM0.0012207 155.136V196.094C0.0012207 198.252 1.75005 200 3.90747 200H44.8672C47.0247 200 48.7735 198.252 48.7735 196.094V155.136C48.7735 152.979 47.0247 151.23 44.8672 151.23H3.90747C1.75044 151.23 0.0012207 152.979 0.0012207 155.136ZM14.6208 90.7388H3.90747C1.75005 90.7388 0.0012207 92.4876 0.0012207 94.645V135.604C0.0012207 137.761 1.75005 139.51 3.90747 139.51H14.6208C16.7782 139.51 18.527 137.761 18.527 135.604V94.645C18.527 92.488 16.7782 90.7388 14.6208 90.7388ZM84.8813 18.5306H105.361C107.518 18.5306 109.267 16.7817 109.267 14.6243V3.90674C109.267 1.74932 107.518 0.000488281 105.361 0.000488281H64.402C62.2446 0.000488281 60.4958 1.74932 60.4958 3.90674V14.6243C60.4958 16.7817 62.2446 18.5306 64.402 18.5306H84.8813ZM139.512 14.6243V3.90674C139.512 1.74932 137.763 0.000488281 135.606 0.000488281H124.892C122.734 0.000488281 120.986 1.74932 120.986 3.90674V14.6243C120.986 16.7817 122.734 18.5306 124.892 18.5306H135.606C137.763 18.5306 139.512 16.7817 139.512 14.6243ZM0.0012207 44.8692C0.0012207 47.0267 1.75005 48.7755 3.90747 48.7755H44.8672C47.0247 48.7755 48.7735 47.0267 48.7735 44.8692V3.90674C48.7735 1.74932 47.0247 0.000488281 44.8672 0.000488281H3.90747C1.75005 0.000488281 0.0012207 1.74932 0.0012207 3.90674V44.8692Z"
      />
    </svg>
  );
}

export function Star({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 350"
      fill="none"
      className={className}
    >
      <path
        d="M8.43739 341.563C89.9026 245.595 89.9026 104.405 8.43737 8.43737C104.405 89.9026 245.595 89.9026 341.563 8.43739C260.097 104.405 260.097 245.595 341.563 341.563C245.595 260.097 104.405 260.097 8.43739 341.563Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function Pinwheel({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      fill="none"
      className={className}
    >
      <path
        d="M188.64 399.713L140.205 372.631L140.226 372.596L224.777 235.201L264.106 257.225L188.64 399.713ZM136.093 142.778L211.031 0.289751L258.943 27.8911L258.917 27.9327L174.369 165.324L136.093 142.778ZM280.193 172.77L367.796 308.396L319.356 336.828H319.007L241.387 195.844L280.193 172.77ZM21.2092 234.607L182.171 239.357L183.22 283.927L21.2092 290.787V234.921V234.607ZM216.976 116.073L378.994 109.213L379.519 164.87H379.203H379.201L216.976 161.171V116.073ZM118.952 226.701L32.4033 90.546L80.1791 62.1955L157.228 204.155L118.952 226.701Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.418333"
      />
    </svg>
  );
}
export function PencilSquare({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
}

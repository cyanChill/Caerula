# Caerula

[![MIT License][license-shield]][license-url]

This is a fun side project about [Arknights](https://www.arknights.global/), a game developed by Hypergryph.

Caerula currently aims to offer an interactive web interface for viewing information about Arknights with a simple but familiar design.

## Built With

[![Jotai][Jotai]][Jotai-url]
[![Next][Next.js]][Next.js-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Tailwind CSS][Tailwind]][Tailwind-url]
[![Vercel][Vercel]][Vercel-url]

## Getting Started

### Prerequisites

This project utilized [`pnpm`](https://pnpm.io/) as its package manager.

> To use `npm`, remove the "preinstall" script in `package.json`.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/cyanChill/Caerula.git
   ```
2. Then install the dependencies by running `pnpm i`.


## Contributing

Feel free to submit an [Issue](https://github.com/cyanChill/Caerula/issues) or [Pull Request](https://github.com/cyanChill/Caerula/pulls) if you:

- Find any incorrect information, bugs, inconsistent UI, etc.
- Have a feature request.
- Want to push a feature you developed to the site.

## Acknowledgements

- Game data is provided by [Kengxxiao/ArknightsGameData_YoStar](https://github.com/Kengxxiao/ArknightsGameData_YoStar).
- Game assets provided by [yuanyan3060/ArknightsGameResource](https://github.com/yuanyan3060/ArknightsGameResource) and [Aceship/Arknight-Images](https://github.com/Aceship/Arknight-Images).

## Disclaimer

Arknights is a mobile game developed & distributed by ©Hypergryph/Studio Montagne/Yostar. The in-game assets contained in this repository and used on the site are the property of Hypergryph/Yostar. This repository & site may contain copyrighted material whose use may not have been specifically authorized by the copyright holder.

This project is not affiliated or endorsed by Arknights' creators & distributors and is distributed without profit for research and educational purposes.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/cyanchill/caerula
[license-url]: https://img.shields.io/github/license/cyanchill/caerula?style=for-the-badge&labelColor=000000
[Jotai]: https://img.shields.io/badge/Jotai-000000?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAmFSURBVFhHxVd5cJRnGX/2+3a/PbKbzSabk4TcKQkNhJajBLCpA50BWyi1NLXVjg6HiuBMqaVIOQpCDzo1HKMSLTIw4FA6VcGxIFZKRUXOFoJFICSQk90keyV7fXv5e95sqJkC4l99kje72e99jvd5fs/veZe+bNEkX/8vafzVDlswFKoKhUKZlEjIer3ek2IyXlq0cEFXcss9yz0HsHPnTo3L433WmGJZmmq1TrBYUiWDXk+xRIJCgQD5fF7y+wf+FVPVbfYs+zvP1tfHkqp3lXsKYOu2bZZwOPJuYUnJzKqq0WTPsJPBaCBZlsXzWCxGwWCIXC4XXb16hTrabvxN0clzFy1c2Cs23EX+ZwC7du/WORw9R0ZXj6mrqRlHNlsawThJ0BxSTmDF8UeNxMjr9dKVK1foYtP5T1NSUqZ++/lv+Qd33V6k5OsdxXHTsaaoqKhu7JjqQedaWTgWTpOL37Po8MyamkrlZWVUVlZe4/P6GpKP7ih3DWBzQ0Ox0WRaPqqyklBznFqDkyYoDq9xVHjYQgp4abAHJ6fi4mJKS7PO37p129ikudvKXQMIBENL8vPzFZvNRhJyHo/FRb2jWPw69F78H42RGgohHQkRqNlspoKCAgkBv5A0d1vRvP3ThlpZq9spa+UI0Dz3pR+9eJUf7Nu3T9PV1d02uXZKfmlpKUBnhGEJJxRq4od/E3C4ueFtamxsFPUfP2E8bdr0FpyPpM7OTjp9+qQvG6idM/fJCGvu+PXO7HAkctBsTs0O+v1LpHgstrmivLzivor7Rit6/RrexOLx+Ipxinw+iQaOz5w+RTve+SXazQencZQiTgnUonH7z+HwTex3C71Pzp2jZ+rrCRxB4AcyGU2p7R2dNeIhJBgMLhuRmzextLioUKfTbpGMJiOwZaW83DzKyLDP2rdvv8Ib1ahaaTZbSKvVUsu1ZvrarFm04uWXacH87whDHARnYO/ePWJPRkYGZWbaSZZk5gM6+pcPRZsajSYaCATGsM4Hhz/QpNlss4uKS8hkMpFOlsworfQp19AC9JaUlqZD663fH/ijFAqE8mSZU64hh+MmFIxUWFRIbW3tyQCAfSYhnJRBVwmg1tTUkN1uJ51OB/wEhS7bAD7yWWdgIPTjopKyUdxNUTVCkWi0WUIa/9rb0wNjcSoqKqHSsvIfJiTNPy1W6ww2wE4mTpxE8xcspEJE/vrrb1AkEgXi4xQF8B555KsAqMypJS/KI+HUkqylyZMnC13GjSnFPGn/7w4czR9ZtLG0pASuEtTT6wR4o8c1u3btLggFg621tVPk3PwC0sCAy+2mT86cJZliVHV/NVmtVqRZR1o8Q+UHAZgUr8dDCxYtoOarV8XJOZsrV66kOY/PHiSly/+mPq+PHqqdQpn2TNGzXZ3tdOrkSXRKykRhqaFh84GKiorZ1WPGUpotHbXV0LmzZ8nV46BKUK81LU3UU2RkmPtBSeDn9Jkz5Opz0fjxD1J6ejqyE6V+ZISpWdYpNHXaV4Sex+0CSzZRc/PVM0uXLpkgeACAWN/a2hrv7uoi/0A/UhQDmLAdDrnWnG6nw4FnA/g/LgJhXhhasiTRpIkTacb06aRXFLDnTUFKrMtOdQApPqAA9Ls6O6ilpZkURVnHvm8d5s1Nm36Wk5WzuLq6muxZWXTps88EwMrLyykFrfhM/dN04sQ/RGtZwAkWBZOQyQm6EowHVZV8gSCF1TBNQDDv7X8fuAjAWYs4QM24cdTjdNCFCxfI6XQeWL78pSfY7+A4g8x5Ys5H3d3dMyORSC6fvgORmoBuG9LJtX3y609hFqRT240bVB+303hNClWRgUYl9FSrsVGdPpvaMvT03SU/oI0bXxNZ4jIwb/T29gA/El3GkLpxo+1aZlbW4384eDDIfoeVc82atVnRaORIbnbuWCAUALyfCgBMRW8Q6YxEI9R6/iKN2naKNCYDqTi/P65SmoTRjEnY8nQl5dQ9KALmANRwmLpQ1qamCyiNnrpvdrcaU0zTV65Y0ZJ0OXwWrF+/zgnNqe2d7b/RopasxJOOTxKGMXQLBXrdZM7MJMvIQrLlj6SM3HxKLSwiU24ORXs84l4Qwl7WYV2wK+kNBmrrbD9MmsSk/3bOcqsEQ3L8+HH1qXnzLptMKYuZHdnAUAC8vNc7qdSLE+dkk0bRMcJIAbFo8NqpHSC5KIvbQnQGJziGTPb3+8igU+pXrFhxbdDL53Lbaaiq6kymYRnojUYigmSCuHaFcLpIIkYJo5akDCvJmelkyM3CewSQaiJVws0IwA1gbzgUFs61ICUchjCAHk2aHya3DUCnU77BFwtmsRAMcfsJo+EQhS0KermXEsgGehBZUCiBIKM9LvKaZVEmngX+gF9kTANA80ADj9QnzQ+TL5TgF9sbp2C4vDIC4OP+Fsaw2DmfCKOb2jCc8toDJKH14m4fhdu76GzfFQo9VDIIPv4cNC1BXwsSYq5wu905Mx6dcfTwoUNtSVdCvpCBgD/wSnZ2DohCJ/qY2WyAM+D3C15Q9ArpHhtPH1fF6UTvJTrpuEjHMt3knldDRoNRpB42yIe6sy4HjowS24yo0VvjfkiGtSFuv3VarfIRTzYFSn19veB6tygDz3/+zGyx4HoGfKCvOXqGGrNeDOw50N8PwPVjWPHdQwMeMYkbNNN7OKLSZcwFf3//rGXLXjjE/lhuZWDPnr3acFjdMmLECKZJnLpfDBofG8V7Nj5UCg6GgWWFYcx3wZSgCdF+jJV+ZIyR73F7xFWd9RRwQ17eCMSl2fbu/v2mpNvPMTDugQdezLBnfjMnJ0cQiBN3AGawPhjgqcZl4JNxZ/AXEj3ISQujTFBMvz7s6e3DfpE17OeSIVhuYRZuZ17hkJre1d1l/fDPR0QWRAAbXnsjFy3225zsHF0CF08wFl2/fp2aW65heHT2OJzO8x6vV/W43TYY1OD+CGBhWMM4XzzcLjd1dLTTteZmau9oDzudPU19vX2dLrcrFcEr3A0MYOBTBOxwOibU1T185ONjxzoEBtasXq3v63Nv1xv0z0dUVcIVqhut954kS3vLSstPb9iwnktNS5csLe7p633OqDfUI+2jjUajBndKCuJrE9rv77C9q6S0+P3Vq1b18/6fbNigazp/YQpuz3Ox/zHsL0EpEmFV/RO+WT23dcsW1zAQrlv3arqi6M3Tpj3cPnVqrXB6J1m79lUrTp6dajXH8/LzOxZ/7/u4k99dNm/ZbB/w+GKr1q4ZvMF++UL0H/4Xon5r8LYmAAAAAElFTkSuQmCC
[Jotai-url]: https://jotai.org/
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=FFFFFF
[Next.js-url]: https://nextjs.org/
[Tailwind]: https://img.shields.io/badge/tailwind_css-222222?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4
[Tailwind-url]: https://tailwindcss.com/
[TypeScript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=FFFFFF
[TypeScript-url]: https://www.typescriptlang.org/
[Vercel]: https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=FFFFFF
[Vercel-url]: https://vercel.com/

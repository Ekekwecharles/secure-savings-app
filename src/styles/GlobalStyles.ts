import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  * {
    /* border: 1px solid red; */
  }

  html {
    font-size: 62.5%;

    @media (max-width: 37.5em) {
      font-size: 52%;
    }
  }

  body {
  
  }

  .mhcls1 {
    fill: #fff;
  }
  .mhcls2 {
    fill: url(#mh-lg);
  }
  .mhcls3 {
    fill: url(#mh-lg-2);
  }
  .mhcls4 {
    fill: url(#mh-lg-3);
  }
  .mhcls5 {
    fill: url(#mh-lg-4);
  }
  .mhcls6 {
    fill: url(#mh-lg-5);
  }
  .mhcls7 {
    fill: url(#mh-lg-6);
  }


            /* HTML: <div class="loader"></div>
.loader {
  width: 60px;
  aspect-ratio: 4;
  --_g: no-repeat radial-gradient(circle closest-side,#000 90%,#0000);
  background: 
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 100%;
  animation: l7 2s infinite ease;
}
@keyframes l7 {
    33%{background-size:calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%}
    50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%}
    66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%  }
} */

 /* HTML: <div class="loader"></div> */
.loader {
  width: 40px;
  aspect-ratio: 4;
  background: radial-gradient(circle closest-side,#fff 90%,#0000) 0/calc(100%/3) 100% space;
  clip-path: inset(0 100% 0 0);
  animation: l1 1s steps(4) infinite;
}
@keyframes l1 {to{clip-path: inset(0 -34% 0 0)}}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}

`;

export default GlobalStyles;

// MEDIA QUERIES
// 75.6em: 1210px

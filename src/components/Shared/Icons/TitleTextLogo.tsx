import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const TitleTextLogo: React.FC<SvgProps> = props => (
  <Svg width="184" height="37" fill="none" viewBox="0 0 184 37" {...props}>
    <Path
      fill="#fff"
      d="M37.975 18.985c-.035-.57-.09-1.04-.155-1.42v-.125c.045-.27.08-.58.095-.93.035-.81-.025-2.02-.12-2.595v-.185l.01-.32c.03-.185.055-.395.07-.63.035-.53.025-1.29-.015-1.905l.03-.715c.04-.77.03-1.895-.035-2.76.025-.39.04-.795.045-1.195-.04-.745-.085-1.5-.125-2.26l-.015-.285c-.01-.095 0-.18-.03-.345a.961.961 0 00-.9-.78c-.14 0-.205.005-.31.01l-.575.025c-.445.02-.69-.03-.825-.09l-.185.015c-.24.02-.465.045-.665.07l-.27.04-.135.035c-.095.03-.335.065-.565.06h-.56c-.075.035-.21.08-.38.105.02 0 .035.01.055.015h-.055c-.36 0-.65.29-.65.65v.47l-.015-.535a.726.726 0 01.215-.475.836.836 0 01.455-.235.792.792 0 00-.735.385.854.854 0 00-.125.43l-.025.36c0 .125.01.26.015.385v.61c.015.14.015.28 0 .415l-.025.185a.593.593 0 01-.06.21c0 .01-.01.01-.01.02.01.135.015.285 0 .445-.015.2-.03.41-.04.625v.255c.005.155.005.325-.01.49V8c.015.205.025.405.045.585v.035l.01.065c.025.18.035.38.02.61a1.734 1.734 0 01-.025.21c.04.225.05.575 0 .835-.02.12-.025.145-.03.28v.355c0 .185.035.55.055.73.045.375.025.73-.04.945-.04.145-.09.195-.14.195v.395c-.23.01-.42 0-.555-.035l-.245.03c-.57-.025-1.17-.025-1.63.01-.25-.015-.525-.025-.815-.035 0-.17.01-.34.015-.515l.01-.495c.04-.3.07-.63.08-.98.03-.94-.055-2.28-.165-2.925l-.025-.535c.02-.33.025-.675.025-.965-.005-.515-.035-.97-.07-1.36.015-.375.015-.74.005-1.09l.035-.245a.975.975 0 00-.025-.42 1.097 1.097 0 00-.785-.775c-.09-.025-.24-.04-.29-.04l-.185-.01-.38-.015c-.255-.01-.51-.015-.76-.015-.15-.01-.3-.02-.46-.025-.67-.025-1.55.015-2.22.08h-.17c-.34 0-.655.17-.85.405a1.081 1.081 0 00-.25.785c.02.325.05.62.085.88a9.406 9.406 0 00-.23 1.94c-.015.73.035 1.675.115 2.345-.005.15-.01.295-.005.445.005.56.065 1.195.14 1.64 0 .275.01.545.025.805-.04.255-.07.56-.08.88-.015.5.02 1.155.07 1.62-.01.305-.01.615-.005.92-.125.705-.23 2.1-.175 3.1.005.14.02.28.035.415 0 .6.03 1.245.075 1.665-.01.145-.02.29-.02.44v.2c-.025.235-.04.475-.045.705-.025.67-.02 1.315.005 1.9-.04.31-.07.655-.08 1.02-.02.79.05 1.855.14 2.465-.01.45-.01.96.01 1.425-.03.46-.045.99-.04 1.485-.03.29-.055.61-.07.94l-.015.49v.24c0 .08-.01.14.01.305a1.194 1.194 0 00.985 1.08c.22.03.275.02.38.03.385.015.77.02 1.13.01.73-.025 1.485-.125 1.95-.24.105.01.215.02.335.025.115 0 .235.005.365.01h.195c.05 0 .2-.005.295-.035.44-.105.76-.52.775-.915.02-.16.015-.21.025-.31l.015-.275c.015-.255.025-.555.03-.88.11-.8.19-1.995.15-2.93a13.16 13.16 0 00-.08-.93c-.01-.53-.045-1.045-.085-1.385l-.02-.14c0-.16 0-.32.005-.49.005-.255 0-.545-.005-.84.035-.795.02-1.635-.035-2.375v-.395l.41-.015.11.01c.49.055 1.295.09 2.015.08.245.025.515.045.79.06 0 .205 0 .405.015.59.015.24.04.475.07.69-.015.57-.015 1.21.015 1.73-.015.145-.025.29-.04.425-.08 1.2-.06 2.42.035 3.41 0 .375 0 .745.02 1.035-.04.25-.07.54-.08.85-.015.455 0 1.035.035 1.54v.155c-.01.32-.01.63-.005.925.01.155-.015.255.04.525.06.225.19.42.355.555.12.12.28.22.465.27.085.025.215.035.27.04l.185.01c.245.015.505.025.765.035.52.015 1.04.01 1.45-.025l.155-.015c.335 0 .66-.015.93-.035l.67.03.205.01a1.115 1.115 0 001.005-.56c.16-.235.16-.62.15-.73l-.01-.51c.005-.345 0-.715-.01-1.055a17.385 17.385 0 00-.095-3.265v-.205c-.005-.215-.015-.41-.025-.6.08-.485.145-1.145.14-1.77 0-.315-.02-.655-.05-.975.02-.63.01-1.28-.025-1.885.025-.105.05-.22.07-.365.11-.78.14-2.395.08-3.345l-.025.01zM18.995 28.11l-.07-.215-.015-.09c.025-.2.04-.435.025-.695-.025-.6-.185-1.485-.325-1.895l-.01-.135-.02-.235c.015-.14.025-.295.025-.47 0-.06 0-.08-.01-.175-.01-.095-.04-.19-.075-.285-.08-.19-.225-.36-.4-.475a1.143 1.143 0 00-.595-.185c-.245.005-.305.04-.43.055l-.52.025c-.565.015-1.385.09-2.015.185-.29-.01-.585-.01-.88 0a63.78 63.78 0 01-3.35.34c-.33.025-.51-.02-.61-.08l-.14.02c-.175.025-.34.05-.49.075l-.2.045-.1.04c-.07.03-.245.065-.415.065H7.96a.998.998 0 01-.28.105c.015 0 .025.01.04.015h-.48a.488.488 0 01-.47-.365c.04.115.12.22.225.27.115.06.23.05.345.035.135-.015.23-.045.34-.065-.16-.025-.375-.035-.49-.065a.296.296 0 01-.195-.22c-.025-.04-.03-.09-.03-.2v-.45a1.073 1.073 0 010-.31l.025-.135a.383.383 0 01.06-.155c0-.01.01-.01.01-.015-.01-.1-.015-.21 0-.33.015-.145.03-.3.04-.46v-.19a2.256 2.256 0 01.01-.365v-.36c-.01-.155-.02-.3-.04-.435v-.025l-.01-.05a1.632 1.632 0 01-.02-.45.911.911 0 01.025-.155 1.416 1.416 0 010-.615.88.88 0 00.03-.205v-.26a6.368 6.368 0 00-.055-.54c-.045-.275-.025-.54.04-.7.04-.105.09-.145.14-.145l.01-.54-.035-.35c-.025-.2 0-.36.035-.475l-.03-.18a7.963 7.963 0 00-.01-1.205c.04-.48.06-1.06.08-1.695l.01-.365c.02-.11.035-.225.05-.345l.02-.185c0-.06.01-.15.01-.13.01-.01.015-.02.025-.035 0-.005.01-.01.02-.02-.03-.005.135-.015.215-.02.395-.03.76-.08 1-.135l.395-.025c.245.02.5.025.715.025.38-.005.715-.035 1.005-.07.275.015.545.015.805.005.43.1 1.27.18 2 .18.11.01.225.02.34.025.495.025 1.145-.015 1.64-.08h.125c.285-.005.545-.02.785-.04l.175-.015a1.001 1.001 0 00.675-.29.928.928 0 00.36-.32c.05-.075.095-.165.125-.26.03-.085.045-.235.055-.27.04-.245.07-.515.08-.795.015-.54-.035-1.24-.115-1.735.005-.11.01-.22.005-.325a6.338 6.338 0 00-.14-1.215.945.945 0 00-.415-.775.889.889 0 00-.415-.235c-.2-.04-.285-.035-.41-.045a7.27 7.27 0 00-1.2.07 10.28 10.28 0 00-.68-.005c-.52-.125-1.55-.23-2.295-.175-.105.005-.205.02-.31.035-.445 0-.92.03-1.23.075a3.437 3.437 0 00-.325-.02h-.15a4.662 4.662 0 00-.52-.045c-.495-.025-.975-.02-1.405.005-.23-.04-.485-.07-.755-.08-.585-.02-1.37.05-1.825.14-.335-.01-.71-.01-1.05.01-.17-.015-.355-.025-.54-.035H3.84l-.315.01c-.5-.03-1.13.155-1.57.49C1.39 6.015.9 6.59.645 7.115a3.654 3.654 0 00-.36 1.52L.21 8.81l-.01.02v.09l-.01.065c-.02.33-.005.785.03 1.15l-.03.4c-.015.185-.025.41-.03.65-.11.59-.19 1.475-.15 2.165.015.235.045.47.08.685.01.39.045.775.085 1.025l.02.105c0 .12 0 .24-.005.36-.005.19 0 .405.005.62-.035.59-.02 1.21.035 1.755-.015.395 0 .78.03 1.125l-.01.08c-.055.36-.09.96-.08 1.49a9.007 9.007 0 00-.075 1.755c.015.18.04.35.07.51-.015.425-.015.895.015 1.28-.015.105-.03.21-.04.315-.055.635-.06 1.28-.025 1.86v.095l.015.035c.08.23.17.445.27.645.095.275.215.545.335.74.055.195.14.415.27.635.185.32.525.69.895.92l.105.08c.445.33.965.485 1.41.5.365.085.745.1 1.125.12.385.015.765.01 1.07-.025l.115-.015c.245 0 .485-.015.685-.035l.495.03c.395.03.92.035 1.425.015.255.005.53 0 .78-.015a8.728 8.728 0 002.425-.13h.15c.16-.015.305-.03.445-.045.36.07.855.115 1.32.085.235-.015.485-.05.725-.09.47-.01.95-.06 1.4-.135.08.02.17.035.28.045.295.025.745.01 1.21-.04.23-.025.47-.055.69-.1.11-.02.215-.04.32-.065a1.17 1.17 0 00.955-1.075c0-.075 0-.15-.01-.225-.01-.08-.025-.09-.035-.135l.01-.02zm-12.25-4.465v-.05c0 .035.005.065.01.1 0-.02-.01-.035-.01-.05zM147.705 9.28c-.05-.325-.12-.59-.205-.805v-.07c.06-.15.105-.33.13-.525.05-.455-.035-1.145-.16-1.47v-.105l.01-.18c.04-.105.075-.225.095-.355.045-.3.03-.73-.02-1.08.015-.13.025-.265.04-.405a5.884 5.884 0 00-.045-1.56c.02-.08.035-.285 0-.47-.03-.185-.1-.365-.195-.525a1.632 1.632 0 00-.83-.575c-.16-.05-.33-.07-.49-.065-.16.005-.23.025-.35.035-.44.045-.87.095-1.3.14-.25.025-.39-.04-.47-.12l-.105.02c-.135.03-.265.06-.375.095-.055.015-.105.035-.155.055 0 0-.07.045-.075.05a.615.615 0 01-.32.085h-.32a.615.615 0 01-.215.14c.01.005.02.015.03.02h-.03c-.33 0-.62.16-.805.405.015-.025.035-.05.05-.07.12-.16.305-.295.48-.375.1-.05.18-.09.275-.125a1.197 1.197 0 00-.95.25c-.055.07-.115.155-.16.235-.03.045-.05.1-.075.15-.035.075-.06.16-.075.24v.025c-.01.1-.015.215-.03.29l-.03.105a.415.415 0 01-.075.12c0 .005-.01.005-.015.01a.527.527 0 010 .25c-.025.11-.04.23-.055.355v.145c.01.085.01.185-.015.28 0 .09 0 .185.005.275.01.115.03.23.05.33v.02l.015.035a.713.713 0 01.025.345c-.005.05-.02.085-.035.12.05.125.065.325.005.47a.423.423 0 00-.045.16v.2c.005.105.05.31.075.415.06.21.035.41-.05.535-.055.08-.12.11-.19.11l-.015.415c.01.095.025.185.045.265a.526.526 0 01-.045.365l.04.14c-.03.325-.03.665.015.925-.055.37-.08.815-.105 1.3l-.015.28c-.055.17-.095.355-.11.555-.04.535.07 1.29.22 1.655.005.105.02.205.03.305-.025.19-.035.38-.03.545.01.295.045.55.095.77-.02.21-.02.42-.005.615-.135.33-.24.975-.235 1.535a2.17 2.17 0 00-.035.26c-.03.38.02.88.105 1.255v.095c.015.435.075.805.165 1.1a2.555 2.555 0 00-.31 1.095c-.025.415.045.95.155 1.325-.005.085-.01.17-.01.25.01.32.085.675.185.93 0 .155.015.31.03.455a1.672 1.672 0 00-.105.5c-.02.285.025.655.095.92-.015.175-.015.35-.01.52-.17.4-.305 1.19-.235 1.755.01.08.025.16.045.235 0 .34.04.705.1.94a2.01 2.01 0 00-.03.25v.115c-.03.135-.05.27-.065.4-.03.38-.025.745.01 1.075-.055.175-.095.37-.105.575-.025.445.065 1.05.19 1.395-.015.255-.01.545.015.805-.04.26-.06.56-.055.84-.02.08-.04.17-.055.26l-.01.065v.115c-.01.075 0 .155.01.235.045.31.2.615.41.825a1.602 1.602 0 001.22.65h.17c.105.01.21.005.315 0 .415-.035.84-.17 1.105-.32.06.015.125.025.19.035.255.03.6.005.88-.04l.31.04c.145.025.315.035.5.04a1.142 1.142 0 00.515.06c.23-.02.475-.095.69-.23.445-.265.74-.805.735-1.285v-.12l-.01-.065-.025-.135a3.95 3.95 0 00-.065-.26 3.449 3.449 0 00-.115-.785l-.03-.08c0-.09 0-.18.005-.275.005-.145 0-.31-.01-.475.05-.45.03-.925-.05-1.345.015-.3 0-.595-.04-.86l.015-.06c.075-.275.12-.735.105-1.14.095-.41.155-.94.1-1.345-.02-.135-.05-.27-.095-.39.025-.325.02-.685-.02-.98.02-.08.04-.16.05-.24.105-.68.075-1.37-.045-1.93.005-.21 0-.42-.025-.585.05-.145.09-.305.11-.48a3.71 3.71 0 00-.045-.87v-.09c.025-.365 0-.7-.04-.995.115-.47.175-1.18.085-1.645l-.02-.085c0-.19-.02-.375-.045-.525l.045-.38c.04-.3.05-.705.02-1.09.005-.195 0-.405-.015-.595a4.364 4.364 0 00-.12-1.85v-.115a3.39 3.39 0 00-.035-.34 2.72 2.72 0 00.19-1c0-.18-.025-.37-.065-.555.025-.36.01-.725-.035-1.07a.975.975 0 00.095-.205c.145-.44.185-1.355.105-1.89v.005zM138.225 25.025l-.02-.015c-.21-.2-.415-.38-.59-.525-.39-.315-.73-.55-1.025-.72l-.08-.07a4.335 4.335 0 00-.485-.66c-.47-.525-1.285-1.205-1.73-1.465l-.11-.115-.195-.2a3.23 3.23 0 00-.325-.45c-.3-.355-.785-.81-1.2-1.145l-.415-.465a13.883 13.883 0 00-1.75-1.65c-.22-.265-.455-.52-.7-.77l-.575-.47c.13-.855.27-1.735.345-2.62.035-.395.12-.605.215-.715v-.17a9.57 9.57 0 00-.045-.6 2.664 2.664 0 00-.04-.24s-.035-.11-.045-.125c-.035-.085-.07-.3-.065-.5 0-.12.005-.33.01-.495-.045-.07-.1-.185-.14-.33-.005.02-.015.03-.02.05v-.475h1-.12c-.22.01-.45.025-.665.05v-.05l-.05.055a.438.438 0 00-.08.01c0 .02.01.04.01.06l-.095.095.12.015c.015.065.035.125.05.19l.025-.185.625.075c.105-.01.225-.015.335-.02h.495l.03-.01c.125-.015.245-.015.365 0l.16.03a.77.77 0 01.185.075c.01 0 .01.01.02.015a1.27 1.27 0 01.39 0c.175.025.355.04.545.055h.225c.135-.01.285-.01.43.015h.425c.18-.015.35-.035.51-.055h.03l.055-.015c.16-.035.33-.045.53-.025.075.005.135.02.185.035a1.61 1.61 0 01.725-.005c.105.03.13.035.245.045h.31c.11 0 .29-.03.445-.1.16-.065.295-.165.37-.24.335-.31.495-.685.61-.95.07-.185.13-.215.195-.22l.015-.635a4.898 4.898 0 00-.045-.41c-.035-.24 0-.425.045-.56l-.04-.21a9.39 9.39 0 00.02-.745l-.01-.355c0-.14-.035-.345-.095-.485-.1-.44-.44-.885-.96-1.08-.245-.11-.6-.115-.725-.115-.18-.005-.36-.015-.55-.02-.135 0-.28-.01-.43-.015a5.38 5.38 0 00-.855-.11c-.82-.04-1.99.07-2.55.22-.16.005-.315.02-.465.03a8.193 8.193 0 00-.84-.03c-.45.01-.845.045-1.185.095a8.626 8.626 0 00-.95-.005c-.505-.135-1.495-.24-2.36-.24a5.17 5.17 0 00-.4-.035c-.58-.03-1.35.02-1.935.105h-.145a9.94 9.94 0 00-1.69.165c-.41-.155-1.025-.285-1.69-.31-.635-.025-1.46.045-2.045.155-.13-.005-.26-.01-.385-.01-.13 0-.235.005-.39.02-.205.015-.41.07-.585.165-.36.185-.585.5-.675.775-.18.3-.17.74-.145.91a3.819 3.819 0 00-.105.765c-.02.435.025 1.01.095 1.415-.005.135-.01.27-.01.4v.2c0 .08.01.19.03.285 0 .23.075.53.28.8.2.27.54.51.95.58.235.035.325.03.455.045l.375.015c.245.005.485 0 .705-.015a4.28 4.28 0 00.365-.045c.525 0 1.085-.04 1.45-.1.125.015.25.025.385.03h.175c.205.03.415.05.615.065.585.03 1.145.025 1.66-.01l.105.015c.015.545.075 1.11.125 1.49-.035.38-.08.8-.115 1.195-.08.38-.2.81-.28 1.215-.08.23-.2.475-.29.725-.09.255-.185.51-.275.745-.14.26-.29.535-.455.81-.15.285-.29.56-.425.82-.125.275-.24.56-.355.825-.105.265-.175.525-.235.725-.065.065-.13.135-.195.21-.24.295-.54.72-.77 1.08-.105.11-.21.225-.325.335-.16.15-.335.34-.52.55-.56.425-1.33 1.115-1.845 1.74a7.04 7.04 0 00-.475.66c-.305.345-.585.7-.745.955l-.065.11c-.095.1-.195.2-.3.305l-.245.255c-.03.035-.11.12-.165.195-.055.08-.105.165-.145.255-.315.555-.175 1.36.325 1.775l-.035-.035c.2.205.4.395.595.57.295.36.61.685.915.96l.05.08c.195.31.535.755.895 1.165l.015.02.02.015c.115.105.24.19.375.255a1.551 1.551 0 001.79-.13c.06-.05.115-.105.14-.125l.185-.185c.12-.125.235-.245.335-.365.135-.16.255-.33.355-.49.37-.335.76-.735 1.05-1.085.1-.075.2-.15.295-.23.815-.675 1.535-1.495 2.005-2.25.22-.25.42-.52.56-.735.18-.15.365-.33.54-.55.255-.32.53-.77.725-1.185l.08-.115c.04-.06.07-.115.105-.175.415.575 1.02 1.275 1.51 1.68l.105.085c.2.21.405.405.585.56.12.145.24.295.365.455.285.365.705.825 1.13 1.235.2.225.425.455.64.66.215.28.455.565.675.79.495.515.96.915 1.36 1.2l.12.13c.145.17.395.345.615.41.195.12.46.205.75.195a1.47 1.47 0 00.87-.32l.04-.035c.11-.1.215-.2.32-.305.19-.2.38-.43.545-.655.4-.38.785-.79 1.12-1.205.09-.04.185-.09.29-.16.14-.09.3-.215.475-.365l-.045.045a1.7 1.7 0 00.24-2.44l-.035-.04-.01-.025z"
    />
    <Path
      fill="#fff"
      d="M129.31 10.08l-.075.075a.557.557 0 00.085-.01c0-.015-.005-.025-.005-.035v-.03h-.005zM184.005 30.955c-.01-.68-.03-1.38-.075-1.985l.025-.415.01-.21v-.275a1.613 1.613 0 00-.67-1.175 1.69 1.69 0 00-.59-.24 1.68 1.68 0 00-.315-.03c-.105 0-.135.005-.21.01l-.76.045c-.515.03-1.03.055-1.55.085-1.055.055-2.12.11-3.17.16-.62.03-.93-.025-1.075-.09l-.265.025-.96.095c-.14.02-.275.035-.405.05l-.22.04c-.15.035-.515.07-.835.07h-.785a3.71 3.71 0 01-.625.11c.025 0 .04.01.06.015h-.075v-2.295.19c.01.485.03 1.005.055 1.41.015.24.04.39.06.575.05-.675.105-1.35.155-2.04 0-.16 0-.345-.005-.51v-.82c0-.185 0-.375.015-.565l.03-.255c.025-.135.05-.235.08-.3 0-.015.01-.02.015-.03a3.313 3.313 0 010-.59c.01-.1.015-.205.02-.31.215-.015.45-.015.675.015h.685c.29-.01.565-.025.82-.045h.05l.09-.015c.255-.035.535-.04.855-.02.12.01.215.02.3.04.315-.05.81-.06 1.17 0 .165.03.205.035.39.045h.495c.26 0 .775-.045 1.025-.07.265-.04.49 0 .83-.065.3-.065.545-.21.72-.34.23-.18.33-.27.39-.24.065-.12.11-.255.145-.39.01-.07.025-.135.03-.205.005-.07.01-.14.005-.175v-.515c-.01-.225-.025-.45-.04-.66-.035-.385 0-.685.045-.9-.015-.12-.02-.22-.05-.41-.05-.655-.575-1.23-1.195-1.37-.075-.02-.155-.03-.23-.04-.075 0-.175-.01-.21 0l-.28.015c-.18.015-.355.03-.52.04a83.414 83.414 0 00-3.225-.015c-.22 0-.45 0-.695.005-.42-.04-.885-.07-1.375-.07-1.32-.005-3.2.16-4.1.335-.255.02-.505.035-.75.05-.465-.01-.945-.01-1.355.005-.725.03-1.36.08-1.91.145-.525 0-1.04.01-1.53.035h-.005c-.205-.03-.455-.055-.745-.075l-.435-.03a.43.43 0 01-.16-.075.333.333 0 01-.125-.28c.01-.33.015-.71.015-1.055.015-.21.03-.425.035-.645.03-.94-.02-2.175-.105-3.115v-.235a26.5 26.5 0 00-.055-1.495c-.015-.285-.03-.285-.005-.395.02-.09.07-.17.14-.24.095-.01.175 0 .27.035.205.035.42.065.655.095.465.055.98.095 1.51.105a26.06 26.06 0 003.29-.155c.21.005.415.01.62.01.79-.01 1.68-.085 2.3-.185.385 0 .765-.015 1.13-.03.36.055.785.095 1.235.105.7.02 1.62-.025 2.275-.095.43.015.865.015 1.29.01.495.085 1.23.16 2.02.205l.6.03h.265c.045 0 .09 0 .145-.01.195-.02.51-.135.705-.385.195-.245.235-.465.26-.62.02-.16.02-.28.025-.39a19.19 19.19 0 00-.02-.555c-.01-.2-.025-.39-.045-.585 0-.425-.01-.86-.03-1.265l-.03-.59c-.025-.2-.025-.47-.245-.78a.935.935 0 00-.6-.395c-.1-.025-.185-.025-.26-.03h-.44a13.51 13.51 0 00-.99-.065c-.94-.03-1.845-.025-2.67.01-.435-.055-.92-.095-1.43-.105-1.11-.025-2.605.065-3.46.19a33.467 33.467 0 00-2 .015c-.645-.04-1.39-.06-2.08-.055-.82-.08-1.8-.13-2.67-.115a26.753 26.753 0 00-3.165-.12c-1.025.035-2.085.17-2.735.32-.15-.015-.305-.025-.47-.035-.57-.015-1.625-.105-2.405.51-.29.185-.54.51-.655.86-.045.12-.065.245-.09.375a3.45 3.45 0 00-.025.355l-.015.655c-.15 1.12-.255 2.8-.2 4.11.02.445.06.895.11 1.305.015.745.055 1.47.115 1.945l.03.2c0 .225 0 .45-.005.685-.005.36 0 .765.01 1.18a27.676 27.676 0 00.055 3.355 2.3 2.3 0 001.405 2.07c.055.03.105.065.165.09.19.095.425.175.7.215l.21.02.175.01.36.015c.495.02 1.03.025 1.535.02 1.015.095 2.33.155 3.33.1.34-.02.665-.05.97-.095.655.02 1.37.02 2.01-.005a32.606 32.606 0 00.055 4.625v.28h-.09c-.355-.05-.755-.09-1.195-.11-.64-.025-1.45 0-2.16.045h-.22c-.9-.025-1.735 0-2.475.04-1.165-.115-2.92-.175-4.075-.085l-.215.02c-.235 0-.465.01-.685.015h-.165c-.085.01-.165.015-.245.035-.16.03-.31.085-.44.155-.435.19-.795.61-.895 1.13a1.7 1.7 0 00-.03.23l-.01.16c0 .1-.005.205-.01.31 0 .215-.01.44-.01.67 0 .465 0 .95.015 1.425v.37c-.005.09 0 .355.045.505.04.17.095.315.135.425l.025.065v.015h.025l.07-.015c.165-.04.27-.04.34-.035v.765a26.141 26.141 0 004.43-.13h.285c.3-.005.575-.02.84-.035.68.11 1.605.195 2.48.19.44 0 .92-.025 1.37-.065.89.025 1.795.01 2.65-.035.145.035.31.07.515.095 1.095.145 3.36.185 4.69.105.805-.05 1.46-.12 1.99-.205h.175c.375.06.815.105 1.305.13 1.135.05 2.835-.035 3.64-.16h.26c.14.005.295.01.45.01.255.04.555.075.88.095.745.045 1.81.03 2.675-.02.33.015.705.02 1.105-.035.315-.05.7-.1 1.135-.43.215-.165.42-.45.495-.76.035-.14.045-.33.045-.41v-.255l.01.045zm-31.415.795v-.135.135zM73.195 16.77v-.11c-.01-.055-.01-.105-.02-.16a1.351 1.351 0 00-.23-.565 1.326 1.326 0 00-.875-.61c-.085-.02-.195-.025-.265-.03h-.175l-.355-.01c-1.745.095-3.61.18-5.47.255-.54.02-.815-.02-.945-.065l-.23.015c-.295.025-.57.045-.835.07l-.35.04-.185.03c-.13.025-.445.05-.725.055h-.685c-.12.025-.31.055-.535.075.025 0 .035.005.055.01h-.065v-1.825c.015.425.025.88.045 1.235.01.21.03.345.04.505.045-.565.095-1.135.14-1.715l-.01-.435v-.275c.17-.01.34-.01.505 0l.225.025c.12.015.205.035.255.06.015 0 .015.01.025.01.16-.01.345-.015.545 0 .25.015.5.025.76.04h.315c.19-.005.4-.005.6.01h.595c.255-.015.49-.025.715-.045h.045l.08-.01a4.443 4.443 0 011.005.005 3.83 3.83 0 011.015 0c.145.02.18.025.34.03h.43c.115 0 .38-.025.57-.14.205-.105.355-.275.43-.395.165-.245.22-.565.215-.78.005-.2.03-.375.06-.505.04-.175.09-.24.14-.24l.01-.89c0-.155-.015-.51-.15-.74a1.66 1.66 0 00-.84-.775 1.167 1.167 0 00-.425-.025c-.7-.025-1.43-.025-1.99.01-.795-.04-1.755-.06-2.8-.08l-.6-.01c-.365-.04-.765-.07-1.195-.08-1.15-.03-2.785.055-3.57.165-.225.01-.44.015-.655.025a24.38 24.38 0 00-1.18-.025c-.63.005-1.185.035-1.665.07-.455-.015-.9-.015-1.33-.005-.355-.05-.875-.095-1.465-.13-.3-.01-.605-.025-.915-.04a.37.37 0 01-.315-.18.246.246 0 01-.025-.1v-.14c.025-.815-.01-1.895-.075-2.71V5.48c0-.215.17-.39.365-.425.025-.01.17-.015.25-.02l.275-.02.505-.045c.575.115 1.44.215 2.365.23.895.015 2.045-.035 2.865-.115.185 0 .365 0 .54.005.685-.005 1.46-.065 2-.14.335 0 .665-.01.985-.025.315.04.685.07 1.075.08.61.015 1.41-.02 1.98-.07.375.01.755.01 1.125.005.43.065 1.07.12 1.755.155.345.015.7.03 1.045.035H68.755a.835.835 0 00.195-.03c.26-.06.49-.19.66-.36.195-.19.325-.435.375-.69.04-.125.05-.305.045-.4v-.28c-.01-.185-.015-.365-.02-.545-.015-.35-.03-.675-.055-.935v-.14c.005-.065 0-.13-.005-.195-.02-.13-.055-.26-.12-.385-.05-.105-.12-.21-.205-.3a1.278 1.278 0 00-.52-.38c-.1-.045-.21-.07-.32-.085l-.155-.01h-.105c-.82-.03-1.605-.025-2.32 0-.38-.04-.8-.07-1.245-.08a25.15 25.15 0 00-3.01.14c-.55-.01-1.17-.01-1.74.01C59.65.435 59 .42 58.4.425 57.69.365 56.835.33 56.075.34A26.6 26.6 0 0053.32.25c-.89.025-1.81.125-2.38.24-.135-.01-.27-.015-.405-.025-.55-.02-1.295-.005-1.895.03-.225-.005-.42-.025-.68-.025a2.958 2.958 0 00-1.205.25c-.535.175-1.17.59-1.58 1.235a3.19 3.19 0 00-.44 1.05c-.08.37-.07.76-.06 1.02.015.39.045.775.08 1.135.01.65.045 1.28.085 1.69l.02.17c0 .195 0 .39-.005.595-.005.31 0 .665.005 1.025-.02.485-.025.985-.015 1.475.005.245.01.485.02.725.005.245.035.54.125.79.095.375.3.725.575.98.27.255.59.42.895.515.045.025.09.04.135.06.31.135.74.23 1.21.25.44.015.9.02 1.34.015.88.075 2.03.115 2.9.075.295-.015.58-.04.845-.07h.075c0 .41.01.815.025 1.175-.015.175-.025.35-.04.52v.125c-1.11-.025-2.19 0-3.105.07-.455 0-.91 0-1.265.02-.31-.04-.66-.07-1.04-.08-.555-.015-1.265 0-1.88.035h-.19c-.785-.02-1.51 0-2.15.03l-.4-.03a1.318 1.318 0 00-.625.105c-.425.175-.765.61-.81 1.11-.01.14-.01.2-.01.28v.695c0 .3.01.585.03.835l.015.185v.305a1.303 1.303 0 00.495 1.06 1.322 1.322 0 00.825.335l.22.01c.65.03 1.525.035 2.35.015.42.005.87 0 1.285-.01.5.025 1.015.04 1.46.035a25.707 25.707 0 002.525-.13h.25c.26-.01.5-.015.73-.025.59.08 1.395.145 2.16.14.385 0 .8-.02 1.195-.05.77.02 1.56.01 2.305-.025.13.025.27.05.445.07.955.11 2.925.14 4.08.08.7-.035 1.27-.09 1.73-.155h.15c.33.045.71.08 1.135.095.985.035 2.465-.025 3.165-.12h.225l.39.01c.225.03.48.055.765.07.645.035 1.575.025 2.325-.015.055 0 .175.005.28-.01a1.378 1.378 0 001.19-1.265c.01-.12 0-.15.005-.23v-.865c-.005-.295-.01-.595-.02-.89v-.215l.01.02zM72.465 27.555a2.518 2.518 0 00-.27-.545c-.03-.29-.15-.63-.295-.945-.185-.29-.37-.58-.605-.715l-.04-.05a4.258 4.258 0 00-.385-.42 3.365 3.365 0 00-.465-.32c-.05-.1-.12-.2-.21-.305a1.956 1.956 0 00-.345-.265 2.458 2.458 0 00-.225-.12c-.24-.245-.58-.365-.935-.51-.39-.43-1.375-.935-2-.885-.32-.1-.65-.125-.955-.12l-.1-.03a3.25 3.25 0 00-.395-.07 2.6 2.6 0 00-.58-.16l-.05-.03-.03-.015c-.1.045-.23.05-.395 0-.405-.135-.94-.19-1.45-.195-.51-.02-.995.04-1.32.145-.1.03-.19.03-.31.005-.305-.06-.695-.13-.995-.055-.16.035-.23.115-.39.145-.065.01-.145.015-.225.015-.33-.005-.67-.01-1.02-.01h-.025a.318.318 0 01-.095-.08c.02.025-.01-.01-.085-.01-.08-.005-.155 0-.235 0-.21.005-.41.03-.61.055-.18.02-.295-.005-.38-.07-.13-.1-.595-.07-.83-.065-.415 0-.805-.06-1.215-.075a8.09 8.09 0 00-2.795.45c-.305.095-.5-.015-.54-.17-.365.04-.745.14-.985.325-.025.02-.05.04-.07.06-.09.025-.18.06-.27.095a3.15 3.15 0 00-.84.095c-.31.075-.605.225-.815.385-.12 0-.25 0-.39.015-.135.025-.28.07-.43.12-.29.11-.6.255-.835.51-.2.2-.315.38-.39.565-.135.1-.28.215-.43.34-.15.125-.305.265-.44.44-.13.15-.28.325-.385.525-.245.265-.515.65-.605 1.015l-.03.065c-.24.165-.43.51-.54.965-.04.3-.04.57.015.82-.055.19-.095.405-.11.62-.005.215.035.43.095.61-.015.31.085.635.165.945.03.37.135.83.415 1.115l.065.065c.045.13.095.26.18.38.05.145.13.315.255.5.11.15.255.265.39.38.145.11.285.22.455.29.115.15.265.315.43.465.17.145.365.25.55.335.07.085.16.18.285.275.22.145.47.265.745.37.275.11.58.155.9.23l.105.02h.01c.2.08.4.095.595.095.31.15.69.31 1.09.35.165.07.345.14.545.195.34.105.79.145 1.145.115l.165.02h.01c.2.06.42.09.655.095.34.105.79.135 1.3.175.135.015.285.015.435 0 .2.03.405.04.605.035.385.17 1.005.305 1.485.205l.19.025c.545.07 1.33.03 1.745-.165l.14-.02c.25.045.545.065.795.03.13.025.28.04.445.015l.13-.02c.22.055.47.095.75.115.49.045 1.175-.04 1.635-.21.285-.04.575-.09.805-.19l.115-.015c.11-.02.23-.05.35-.08.185-.01.375-.035.565-.07l.08.015c.22.04.52.02.83-.02.085 0 .18-.01.285-.025.51-.065.965-.35 1.465-.63.185-.045.38-.105.56-.185.45-.015 1.03-.26 1.355-.575l.18-.09c.485-.235 1.06-.78 1.195-1.17l.01-.02c.15-.095.335-.245.5-.41.145-.19.27-.4.345-.585.1-.16.16-.355.245-.55l.035-.085c.075-.08.135-.175.185-.28.08-.165.185-.38.235-.61v-.01c.31-.515.425-1.6.17-2.185.02-.225.015-.5-.07-.795l.005-.01zm-10.78 3.98c.01.025-.005-.01-.05-.015-.045-.005-.085-.01-.13-.005-.115 0-.23.025-.34.045-.1.02-.165-.015-.21-.08-.07-.1-.33-.08-.46-.1-.23-.03-.445-.11-.67-.155a3.422 3.422 0 00-1.56.065c-.175.045-.27-.11-.27-.275-.195-.045-.41-.035-.56.08l-.045.045c-.05 0-.105 0-.155.01-.23-.155-.655-.255-.925-.115-.23-.2-.58-.34-.92-.215a.73.73 0 00-.325.24c-.165-.035-.355-.025-.565-.045a1.15 1.15 0 00-.315.02 1.077 1.077 0 00-.56-.085h-.035a.608.608 0 00-.45-.3.852.852 0 00-.4.05c-.15-.14-.345-.23-.54-.205-.13-.07-.26-.13-.405-.165-.115-.145-.26-.27-.45-.275H51.3a1.595 1.595 0 00-.13-.13.454.454 0 00-.12-.205c-.1-.105-.23-.155-.38-.21 0-.17-.005-.3-.06-.33.045-.015.075-.025.095-.04.08-.055.095-.26.24-.53l.02-.045c.075-.065.11-.155.15-.25.175-.04.34-.13.5-.255.09-.015.19-.025.29-.06.16-.06.36-.16.495-.3l.08-.03c.11-.005.21-.055.32-.11.195.02.41-.055.67-.12.07-.015.14-.045.215-.075.105 0 .21-.015.315-.045.225.115.545.19.785.075l.1.02c.275.045.705 0 .94-.18l.075-.015c.14.05.3.075.44.045.07.025.155.04.245.03.025 0 .05-.01.07-.015.12.07.255.12.41.155.27.06.645.04.905-.08.155-.005.32-.04.45-.1h.065c.06 0 .13-.01.195-.025.1.02.205.025.31.015l.04.025c.115.07.275.125.445.15a.66.66 0 00.15.035c.275.03.545-.08.85-.215.1.025.21.035.315.03.23.125.55.185.78.05.035.005.065.015.105.02.275.045.64-.015.84-.17h.01c.17.105.44.175.64.115.09 0 .185.01.295.015h.045c.045.04.09.075.145.105.08.05.185.08.295.115.235.22.65.42.965.345.075.085.16.165.29.2.095.025.175.035.27.025.16.23.36.435.59.46l.015.02c.08.1.18.19.295.27a.352.352 0 00-.04.26c.005.025.02.05.04.07a.262.262 0 00-.03.15c-.015.05 0 .11 0 .18-.235.1-.52.25-.605.575-.105.095-.205.21-.3.34l-.045.02c-.05.03-.115.06-.165.105-.095.01-.19.04-.29.075l-.03-.01h-.02c-.02.07-.07.115-.16.125-.43.04-1.05.29-1.36.575a.188.188 0 01-.165.045c-.17-.025-.385-.03-.545.05-.085.045-.115.13-.205.165-.065.03-.15.03-.225.04-.155.005-.305.01-.465.01h-.015a.255.255 0 01-.055-.08h-.005zM111.805 11.595v-.055c.03-.115.06-.25.07-.395.025-.345-.02-.86-.09-1.105v-.215c.03-.08.045-.17.06-.265.025-.225.015-.55-.01-.81.005-.1.015-.2.02-.305l.015-.27a1.137 1.137 0 00-.58-1.04c-.175-.14-.41-.23-.65-.24-.605.065-1.22.13-1.87.185-.19.015-.275-.015-.305-.05l-.08.01-.3.05-.13.03-.075.025c-.05.02-.17.04-.265.04h-.235c-.05.02-.125.045-.215.06.005 0 .005 0 .01.005h-.02v-.705.07c.005.145.015.3.03.415.01.07.025.11.035.16.025-.225.045-.445.065-.655V6.13a.514.514 0 010-.175l.015-.085c.01-.05.02-.085.035-.11v-.015c0-.05 0-.11.01-.185l.03-.275v-.11c0-.06 0-.13.015-.205v-.2c0-.085-.01-.16-.02-.23V4.5a.485.485 0 01-.015-.245c0-.035.01-.07.02-.095a.726.726 0 010-.345c.015-.055.02-.065.025-.12V3.55c0-.075-.02-.22-.035-.29a.676.676 0 01.03-.395c.03-.065.065-.095.1-.1l.01-.3a2.183 2.183 0 00-.025-.19c-.02-.11 0-.2.025-.265l-.02-.1c.01-.115.015-.235.01-.35 0-.12 0-.205-.03-.355 0-.37-.255-.845-.745-1.045a.996.996 0 00-.285-.08c-.205-.05-.31-.06-.47-.07-.4-.025-.97.04-1.245.12l-.23.015c-.14-.015-.285-.02-.41-.015-.22.005-.415.025-.58.05-.16-.01-.315-.01-.465 0a.98.98 0 00-.645.02c-.275.09-.535.325-.66.605-.045.08-.085.17-.11.265a1.17 1.17 0 00-.035.315l.01.245c.01.165.03.33.055.47v.07c.01.325.04.605.09.825-.085.2-.155.5-.17.825-.015.31.025.715.085 1 0 .065-.005.125 0 .19 0 .24.05.51.1.7 0 .115.005.23.015.345-.03.11-.05.24-.06.375-.01.215.015.49.055.69-.01.13-.01.265 0 .39a4.3 4.3 0 00-.13 1.32c.005.06.015.12.025.175 0 .255.02.53.055.71-.01.06-.015.125-.015.185v.085c-.015.1-.03.205-.035.3-.02.285-.015.56 0 .81-.03.135-.05.28-.06.435-.015.335.035.79.105 1.05-.01.195-.005.41.01.605-.02.195-.035.42-.03.63-.045.25-.07.545-.065.81-.05.3-.085.655-.065.96.02.31.09.63.175.83-.01.045-.015.09-.02.14-.015.19 0 .45.025.66l-.02.23c-.01.11-.02.235-.025.375-.08.34-.14.85-.11 1.245.01.135.03.27.06.395.015.23.015.425.08.64.01.03.02.05.03.075.02.09.05.175.095.26.06.13.165.265.295.365.165.155.385.26.615.28.125.01.215 0 .29 0l.245-.025c.225.01.45 0 .645-.02l.045.01c.21.04.55.065.86.06.31.055.705.085 1.01.055.105-.01.2-.03.295-.05.1.01.31.01.465-.045.165-.05.31-.14.415-.245a.954.954 0 00.19-.155 1.117 1.117 0 00.305-.715v-.2c0-.245-.025-.48-.06-.69 0-.16 0-.315-.015-.44.03-.105.05-.23.06-.36.015-.195 0-.44-.025-.655v-.065c.015-.275 0-.525-.025-.75.065-.355.095-.885.05-1.235l-.01-.065c0-.14-.01-.28-.025-.395l.025-.285c.025-.225.025-.53.01-.82 0-.145 0-.305-.01-.45.015-.13.02-.265.025-.39.115-.015.22-.035.315-.055h.085c.09 0 .175-.01.255-.02.205.06.485.105.75.105.135 0 .28-.015.415-.035.27.015.545.005.805-.02.045.02.095.035.155.05.085.02.185.035.31.05.17.015.365-.015.545-.095.365-.15.63-.505.69-.79.045-.165.04-.355.02-.46-.02-.1-.04-.19-.065-.27v-.015zM82.02 20.185c.265 0 .535 0 .74-.015.18.03.385.05.61.06.325.015.74 0 1.1-.025h.11c.46.015.885 0 1.26-.025.595.065 1.49.095 2.075.05l.11-.01c.24 0 .47-.01.665-.025l.48.025c.38.025.89.025 1.375.01.245 0 .51 0 .755-.01.29.02.595.03.855.025.585-.005 1.085-.04 1.48-.095h.145l.43-.02c.345.06.815.105 1.265.105.115 0 .225 0 .355-.015.135-.01.27-.03.395-.06a2.359 2.359 0 001.35-.665c.075-.04.16-.095.245-.17.245-.205.56-.62.695-1.13.075-.245.1-.525.1-.76 0-.21-.01-.41-.02-.58a9.842 9.842 0 00-.11-1.015v-.09c.03-.19.06-.415.07-.665.025-.575-.02-1.445-.09-1.855v-.36a3.4 3.4 0 00.06-.45c.025-.38.015-.925-.01-1.36.005-.165.015-.335.02-.51.03-.55.02-1.355-.025-1.97.02-.28.03-.565.035-.855-.07-1.055-.12-2.165-.17-3.26-.015-.32.02-.495.065-.59l-.01-.135c-.015-.17-.03-.33-.05-.475l-.03-.195-.025-.095a1.739 1.739 0 01-.045-.405v-.4a1.151 1.151 0 01-.075-.27c0 .015-.005.025-.01.04V1.9c0-.34-.24-.63-.56-.7.22.04.425.19.525.365.07.12.11.215.125.335.04-.375-.24-.795-.67-.88-.115-.01-.215 0-.3 0h-.435c-.1.01-.2.01-.3 0l-.13-.015a.516.516 0 01-.15-.04c-.01 0-.01-.005-.015-.01-.095.01-.205.01-.32 0l-.445-.03h-.185c-.11 0-.235.005-.35-.01h-.35a5.18 5.18 0 00-.42.03h-.025l-.045.01c-.07.01-.125.015-.215.02-.09 0-.19.02-.29.055-.075.025-.135.05-.185.07-.17.13-.355.4-.42.635-.035.105-.03.15-.04.235v.255c0 .13.025.395.04.52.035.265.02.52-.03.675-.03.1-.065.14-.1.14l-.01.52.025.335c.02.195 0 .35-.025.46l.02.175c-.015.35-.015.71 0 1.01a36.619 36.619 0 00-1.135-.03h-.355a5.855 5.855 0 00-.7-.065c-.115 0-.24-.005-.37 0a8.574 8.574 0 00-.095-.865l-.015-.385c.015-.24.02-.48.015-.69-.005-.37-.025-.695-.05-.975.01-.265.01-.53 0-.78.02-.105.035-.23.05-.385.015-.21-.04-.46-.195-.665-.15-.21-.395-.37-.675-.42-.16-.025-.245-.015-.33-.02h-.27a7.77 7.77 0 00-.33-.02c-.475-.015-1.11.01-1.585.06h-.12l-.395.01c-.14 0-.355.04-.495.12a.974.974 0 00-.51.695c-.1.255-.105.445-.145.68-.03.235-.05.5-.06.77-.015.525.025 1.195.085 1.675v.315c0 .36.035.76.08 1.07h-.155a5.655 5.655 0 00-.63-.05 8.842 8.842 0 00-1.16.055c-.22-.01-.44-.01-.655 0l-.11-.015c.04-.48.065-1.04.04-1.495l-.025-.295c0-.43-.02-.89-.055-1.19.01-.1.015-.205.015-.315v-.145c.015-.17.03-.34.035-.505v-.18c.005-.06.01-.11 0-.21a1.038 1.038 0 00-.985-.965 6.587 6.587 0 00-.76-.065 11.177 11.177 0 00-1.76.105 13.77 13.77 0 00-1.015.01 1.01 1.01 0 00-1.09.825c-.02.07-.03.165-.035.22l-.015.165c-.005.115-.015.23-.02.345-.01.235-.015.47-.015.69-.05.505-.085 1.1-.065 1.61.02.52.09 1.06.175 1.395l-.02.24c-.015.32 0 .755.02 1.11l-.02.39c-.01.18-.02.4-.025.63-.08.57-.14 1.425-.11 2.095.01.23.03.455.06.665.01.38.03.75.065.99l.015.1v.35c-.01.18-.005.39 0 .6a14.7 14.7 0 00.025 1.7c-.01.38 0 .75.02 1.085l-.01.08c-.04.35-.065.925-.06 1.44-.01.135-.03.26-.03.42 0 .17.005.345.05.52a1.9 1.9 0 00.46.885c.14.15.3.27.46.355.375.295.93.44 1.34.4l.305.03c.86.055 1.73.04 2.435-.025l.01-.02zM81.465 9.84c-.01.05-.005.11.01.15.01.03.03.05.045.07.03-.07.065-.12.105-.17v-.045l.01-.025.015-.035s.01-.035.025-.045h.08s.01-.025.025-.03l.06-.01s.015 0 .02-.005c.005-.015.02-.02.035-.01l.03-.01s.02-.02.045-.03h.005l.01-.01c.03-.02.06-.025.095-.015.015 0 .025.01.03.02.035-.025.09-.035.125 0 .02.015.02.02.04.025h.055c.03 0 .085-.025.11-.04.055-.035.11-.02.145.03.02.03.03.065.03.1l.11.01s.05-.015.07-.025c.04-.02.075 0 .1.025l.035-.02c.085.015.18.015.25-.01.1.03.22.045.35.055.025 0 .05.005.075.005.045.03.095.05.15.06a.64.64 0 00.445-.12c.03 0 .055-.01.08-.015.05.015.105.02.145.015a.648.648 0 00.21-.05c.055.01.115.01.165 0 .09.075.26.13.415.13.025.01.045.015.07.02.025 0 .06.005.075.005l.01-.01s.025-.025.05-.035h.005l.155.055c-.055.08-.11.14-.12.19-.01.055.025.24.085.33 0 .025-.005.045 0 .07 0 .085.05.185.1.25 0 .04.005.085.015.125a.33.33 0 00-.06.135.43.43 0 00.055.245.33.33 0 000 .14c-.09.105-.165.32-.13.475.005.02.015.045.025.065 0 .09.02.19.055.255a.154.154 0 00-.015.065v.03a.468.468 0 00-.035.11c-.02.1-.015.2 0 .29-.03.05-.05.1-.06.155a.579.579 0 00.105.375.623.623 0 00.01.215.68.68 0 00-.03.225.6.6 0 00-.065.29.61.61 0 00-.065.345c.02.11.09.225.175.295-.01.015-.015.035-.02.05-.015.07 0 .16.02.235-.01.015-.015.035-.025.05-.015.02-.025.045-.04.07-.1.05-.18.05-.18.08v.065s-.01.015-.02.025a.491.491 0 00-.09.04l-.02.015h-.075a.378.378 0 00-.13 0 .697.697 0 00-.365.025c-.08-.01-.16 0-.23.02l-.015-.01a.653.653 0 00-.305-.06.546.546 0 00-.36-.055c-.035.01-.07.03-.105.05a.673.673 0 00-.265.01l-.065-.03a.765.765 0 00-.52.025c-.055 0-.115 0-.16.015a.31.31 0 00-.13-.06.481.481 0 00-.235.025h-.025c-.1-.015-.19 0-.27.025-.125-.065-.32-.095-.445-.05l-.025.01c-.025 0-.05 0-.075.01-.01 0-.015.01-.025.015-.01-.01-.015-.02-.025-.03-.015-.03-.035-.045-.075-.075a.235.235 0 00-.045-.06c0-.035.005-.07 0-.095-.005-.02-.01-.045-.02-.065v.035a.623.623 0 00-.06-.2v-.03-.095a.446.446 0 00.13-.26c0-.05 0-.1-.02-.15a.71.71 0 00.01-.29c.02-.015.04-.03.055-.05.09-.11.14-.355.11-.505a.662.662 0 00-.09-.225v-.02c.04-.04.07-.085.085-.135a.57.57 0 00-.045-.4v-.03l.015-.05a.22.22 0 00.06-.09.562.562 0 00.02-.29l.035-.105a.844.844 0 00.02-.42c.025-.06.04-.12.05-.18-.045-.23-.07-.47-.095-.705a.11.11 0 01.075-.12l-.01-.03c-.01-.04-.025-.07-.04-.105-.01-.015-.015-.03-.025-.045l-.025-.02s-.04-.055-.035-.09l.01-.085s-.055-.035-.07-.06c0 0-.005 0-.01.005 0-.085.015-.155.035-.225l.02.015zm0-.02s0-.015.005-.02c0 .005 0 .015-.005.02zm8.55 5.425s-.025-.005-.04-.01l-.02-.015-.03-.025s-.025-.02-.03-.035v-.025s.01-.03.02-.04h.005s-.025-.025-.025-.045v-.095s-.02-.03-.01-.05l-.01-.045s-.015-.04-.03-.06v-.015c-.025-.03-.03-.06-.02-.09 0-.015.01-.025.02-.03-.025-.035-.035-.09 0-.125.015-.02.02-.02.025-.04v-.055a.292.292 0 00-.04-.11c-.035-.055-.02-.11.03-.145a.18.18 0 01.1-.03l.01-.11s-.015-.05-.025-.07c-.02-.04 0-.075.025-.1l-.02-.035a.521.521 0 00-.01-.25c.03-.1.045-.22.055-.35 0-.025.005-.05.005-.075a.395.395 0 00.06-.15.647.647 0 00-.12-.445c0-.03-.01-.055-.015-.08.015-.05.02-.1.015-.145a.617.617 0 00-.05-.205.457.457 0 000-.165c.075-.09.13-.26.13-.41a.368.368 0 00.02-.07.615.615 0 00-.06-.335v-.025a.661.661 0 00-.09-.295.48.48 0 00.17-.295.604.604 0 00-.085-.355c0-.025.005-.045 0-.065-.005-.1-.045-.115-.085-.185.005-.025.01-.05.01-.08.04-.01.07-.025.09-.04.03-.025.045-.07.06-.125a.248.248 0 00.065-.02l.045.06c.035.02.075.035.12.05a.495.495 0 00.255.015c.02-.005.04-.015.065-.025.09 0 .19-.02.255-.055.02.01.045.015.065.015h.03c.035.015.07.03.105.035.1.02.2.015.29 0 .045.03.1.05.155.06.12.015.28-.035.375-.105.07.01.145.005.215-.01.07.02.15.035.225.03a.6.6 0 00.29.065.6.6 0 00.34.065c.11-.02.225-.09.295-.175.015.01.035.015.05.02.065.015.165 0 .235-.02.01.01.02.015.03.025.01.015.02.025.035.035 0 .095-.025.155.025.195.015.015.04.03.075.045.01.02.02.04.03.065v.035c.015.03.03.06.05.08l.02.02v.075c0 .04.01.085.02.125-.015.125.01.25.065.355 0 .08.015.16.045.225V11c-.04.08-.05.2-.03.31a.574.574 0 00-.015.365c.015.035.035.07.06.1 0 .09.01.185.04.26-.01.02-.015.045-.02.065a.73.73 0 00.08.51c0 .055.015.11.03.155a.309.309 0 00-.045.135.492.492 0 00.05.23v.025c0 .1.02.185.055.265-.05.13-.065.325 0 .445l.015.02c.01.05.02.1.04.14l-.015.105a.73.73 0 00.02.29c0 .055.01.11.025.16-.01.065-.015.13-.01.185 0 .03.01.06.02.09v-.035c.015.045.035.09.06.14v.02s-.01.04-.01.06c-.075.015-.135.02-.16.04-.01.01-.02.03-.025.055h-.045c-.02.005-.085.01-.125.025-.015-.02-.035-.035-.055-.05-.12-.08-.365-.1-.51-.055a.622.622 0 00-.215.11h-.02a.37.37 0 00-.14-.07.563.563 0 00-.395.09h-.075a.277.277 0 00-.095-.06.576.576 0 00-.29.01l-.11-.02a.81.81 0 00-.42.025.764.764 0 00-.18-.035c-.225.07-.46.12-.69.17-.065.015-.105-.02-.125-.065l-.03.01c-.035.015-.07.03-.1.05-.015.01-.03.02-.04.03l-.02.025s-.05.045-.085.045h-.085a.167.167 0 01-.06.075s0 .005.005.01h-.005c-.08 0-.15-.02-.22-.06.05.02.11.025.155.01.025-.005.045-.03.065-.045a.366.366 0 01-.13-.115h-.03zM97.57 1.2a.818.818 0 00-.11-.01h.05s.04.01.06.01zM108.665 27.99a2.518 2.518 0 00-.27-.545c-.03-.29-.15-.63-.295-.945-.185-.29-.37-.58-.605-.715l-.04-.05a4.247 4.247 0 00-.385-.42 3.358 3.358 0 00-.465-.32c-.05-.1-.12-.2-.21-.305a1.956 1.956 0 00-.345-.265 2.458 2.458 0 00-.225-.12c-.24-.245-.58-.365-.935-.51-.39-.43-1.375-.935-2-.885-.32-.1-.65-.125-.955-.12l-.1-.03a3.25 3.25 0 00-.395-.07 2.6 2.6 0 00-.58-.16l-.05-.03-.03-.015c-.1.045-.23.05-.395 0-.405-.135-.94-.19-1.45-.195-.51-.02-.995.04-1.32.145-.1.03-.19.03-.31.005-.305-.06-.695-.13-.995-.055-.16.035-.23.115-.39.145-.065.01-.145.015-.225.015-.33-.005-.67-.01-1.02-.01h-.025a.318.318 0 01-.095-.08c.02.025-.01-.01-.085-.01-.08-.005-.155 0-.235 0-.21.005-.41.03-.61.055-.18.02-.295-.005-.38-.07-.13-.1-.595-.07-.83-.065-.415 0-.805-.06-1.215-.075a8.09 8.09 0 00-2.795.45c-.305.095-.5-.015-.54-.17-.365.04-.745.14-.985.325-.025.02-.05.04-.07.06-.09.025-.18.06-.27.095a3.15 3.15 0 00-.84.095 2.37 2.37 0 00-.815.385c-.12 0-.25 0-.39.015-.135.025-.28.07-.43.12-.29.11-.6.255-.835.51-.2.2-.315.38-.39.565-.135.1-.28.215-.43.34-.15.125-.305.265-.44.44-.13.15-.28.325-.385.525-.245.265-.515.65-.605 1.015l-.03.065c-.24.165-.43.51-.54.965-.04.3-.04.57.015.82-.055.19-.095.405-.11.62-.005.215.035.43.095.61-.015.31.085.635.165.945.03.37.135.83.415 1.115l.065.065c.045.13.095.26.18.38.05.145.13.315.255.5.11.15.255.265.39.38.145.11.285.22.455.29.115.15.265.315.43.465.17.145.365.25.55.335.07.085.16.18.285.275.22.145.47.265.745.37.275.11.58.155.9.23l.105.02h.01c.2.08.4.095.595.095.31.15.69.31 1.09.35.165.07.345.14.545.195.34.105.79.145 1.145.115l.165.02h.01c.2.06.42.09.655.095.34.105.79.135 1.3.175.135.015.285.015.435 0 .2.03.405.04.605.035.385.17 1.005.305 1.485.205l.19.025c.545.07 1.33.03 1.745-.165l.14-.02c.25.045.545.065.795.03.13.025.28.04.445.015l.13-.02c.22.055.47.095.75.115.49.045 1.175-.04 1.635-.21.285-.04.575-.09.805-.19l.115-.015c.11-.02.23-.05.35-.08a4.47 4.47 0 00.565-.07l.08.015c.22.04.52.02.83-.02.085 0 .18-.01.285-.025.51-.065.965-.35 1.465-.63.185-.045.38-.105.56-.185.45-.015 1.03-.26 1.355-.575l.18-.09c.485-.235 1.06-.78 1.195-1.17l.01-.02c.15-.095.335-.245.5-.41.145-.19.27-.4.345-.585.1-.16.16-.355.245-.55l.035-.085a1.09 1.09 0 00.185-.28c.08-.165.185-.38.235-.61v-.01c.31-.515.425-1.6.17-2.185.02-.225.015-.5-.07-.795l.005-.01zm-10.78 3.98c.01.025-.005-.01-.05-.015-.045-.005-.085-.01-.13-.005-.115 0-.23.025-.34.045-.1.02-.165-.015-.21-.08-.07-.1-.33-.08-.46-.1-.23-.03-.445-.11-.67-.155a3.422 3.422 0 00-1.56.065c-.175.045-.27-.11-.27-.275-.195-.045-.41-.035-.56.08l-.045.045c-.05 0-.105 0-.155.01-.23-.155-.655-.255-.925-.115-.23-.2-.58-.34-.92-.215a.73.73 0 00-.325.24c-.165-.035-.355-.025-.565-.045a1.15 1.15 0 00-.315.02 1.077 1.077 0 00-.56-.085h-.035a.608.608 0 00-.45-.3.852.852 0 00-.4.05c-.15-.14-.345-.23-.54-.205-.13-.07-.26-.13-.405-.165-.115-.145-.26-.27-.45-.275H87.5a1.595 1.595 0 00-.13-.13.454.454 0 00-.12-.205c-.1-.105-.23-.155-.38-.21 0-.17-.005-.3-.06-.33a.357.357 0 00.095-.04c.08-.055.095-.26.24-.53l.02-.045c.075-.065.11-.155.15-.25.175-.04.34-.13.5-.255.09-.015.19-.025.29-.06.16-.06.36-.16.495-.3l.08-.03c.11-.005.21-.055.32-.11.195.02.41-.055.67-.12.07-.015.14-.045.215-.075.105 0 .21-.015.315-.045.225.115.545.19.785.075l.1.02c.275.045.705 0 .94-.18l.075-.015c.14.05.3.075.44.045.07.025.155.04.245.03.025 0 .05-.01.07-.015.12.07.255.12.41.155.27.06.645.04.905-.08.155-.005.32-.04.45-.1h.065c.06 0 .13-.01.195-.025.1.02.205.025.31.015l.04.025c.115.07.275.125.445.15a.66.66 0 00.15.035c.275.03.545-.08.85-.215.1.025.21.035.315.03.23.125.55.185.78.05.035.01.065.015.105.02.275.045.64-.015.84-.17h.01c.17.105.44.175.64.115l.295.015h.045c.045.04.09.075.145.105.08.05.185.085.295.115.235.22.65.42.965.345.075.085.16.165.29.2.095.025.175.035.27.025.16.23.36.435.59.46l.015.02c.08.1.18.19.295.27a.352.352 0 00-.04.26c.005.025.02.05.04.07a.262.262 0 00-.03.15c-.015.05 0 .11 0 .18-.235.1-.52.25-.605.575-.105.095-.205.21-.3.34l-.045.02c-.05.03-.115.06-.165.105-.095.01-.19.04-.29.075l-.03-.01h-.02c-.02.07-.07.115-.16.125-.43.04-1.05.29-1.36.575a.188.188 0 01-.165.045c-.17-.025-.385-.03-.545.05-.085.045-.115.13-.205.165-.065.03-.15.03-.225.04-.155.005-.305.01-.465.01h-.015a.255.255 0 01-.055-.08h-.005z"
    />
  </Svg>
);

export { TitleTextLogo };

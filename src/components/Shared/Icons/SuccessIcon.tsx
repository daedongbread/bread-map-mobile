import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, SvgProps } from 'react-native-svg';

const SuccessIcon: React.FC<SvgProps> = props => (
  <Svg width={92} height={60} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M1.592 44.437a12.068 12.068 0 0 1-.065-4.791 11.93 11.93 0 0 1 1.802-4.42c2.541-3.728 7.571-5.159 11.775-5.556 4.452-.42 7.85 1.994 11.504 4.239-.02-.013 4.707-4.66 5.235-5.066 1.97-1.513 4.195-2.719 6.63-3.194 2.35-.466 4.867-.565 7.255-.544 2.14.027 4.536.127 6.504 1.088.242.114.474.247.695.399a26.551 26.551 0 0 1 5.385 5.085s5.119-5.257 15.55-4.015c10.43 1.241 14.071 7.494 14.765 11.867.694 4.373-3.474 10.705-20.239 14.9s-25.537 5.352-40.737 3.033c-15.2-2.319-24.495-6.243-26.059-13.026Z"
        fill="#DE9861"
      />
      <Path
        d="M2.868 44.075a10.47 10.47 0 0 1-.177-3.353s.06-.464.025-.214a12.104 12.104 0 0 1 .752-2.785c-.034.082-.03.08 0 0 .22-.502.475-.986.762-1.45.076-.122.154-.24.233-.363.011-.016.253-.353.089-.134a9.993 9.993 0 0 1 1.656-1.69c-.214.17.11-.081.126-.092.1-.074.201-.149.306-.22.24-.166.488-.324.74-.473 1.708-1.011 3.543-1.588 5.647-1.985.203-.038.41-.074.614-.107l.367-.058c.4-.061-.268.031.133-.018.57-.07 1.14-.138 1.713-.152.295 0 .59 0 .883.016.145.01.288.02.432.035 0 0 .456.06.216.023.601.093 1.195.233 1.775.419 1.143.37 2.243.87 3.28 1.488 1.185.67 2.333 1.405 3.492 2.118.805.493 1.633-.022 1.942-.812l-.341.6c.303-.347.628-.672.973-.976.653-.643 1.308-1.284 1.968-1.925.596-.578 1.193-1.157 1.8-1.722.097-.09.192-.182.29-.269l.096-.083c.19-.181-.143.14-.162.123.028.022.819-.6.904-.658.352-.24.706-.47 1.059-.685a12.962 12.962 0 0 1 4.126-1.67 26.51 26.51 0 0 1 4.864-.516 39.53 39.53 0 0 1 4.905.1 17.601 17.601 0 0 1 .621.068c.099.015.198.031.295.05.416.07.829.162 1.235.278.33.093.654.207.97.341-.144-.063.074.038.082.044.096.049.19.094.284.145.209.118.411.247.606.388 1.264.919 2.44 1.96 3.51 3.11.498.519.97 1.064 1.412 1.632.443.58 1.412.47 1.873 0 .118-.121.249-.232.378-.342.067-.057.137-.107.2-.165-.058.054-.301.233-.125.1l.157-.12a16.21 16.21 0 0 1 2.573-1.552l.262-.122.189-.087c-.203.095.108-.043.164-.069l.378-.15c.467-.181.942-.34 1.412-.484a20.395 20.395 0 0 1 2.922-.64c-.28.042.246-.03.313-.036a23.958 23.958 0 0 1 4.19-.1c1.457.076 2.905.294 4.322.65a20.8 20.8 0 0 1 2.77.887c.05.022.481.205.225.093a16.69 16.69 0 0 1 3.29 1.924c.268.202-.1-.09.081.063l.299.248a14.04 14.04 0 0 1 1.564 1.575c.13.156.252.323.384.48-.242-.285-.009-.01.05.07a12.997 12.997 0 0 1 .875 1.401c.201.374.364.725.53 1.088.13.297-.105-.277.008.024.032.081.064.16.094.242.065.182.129.363.187.544.11.352.206.709.286 1.07.033.161.065.323.093.486.013.067.022.134.034.201.05.28-.032-.362-.016-.125.016.238.035.455.034.685 0 .114 0 .229-.013.341-.01.169-.122.611 0 .08a12.779 12.779 0 0 1-.385 1.49c-.047.13-.176.296.036-.078-.029.06-.054.12-.076.181a9.034 9.034 0 0 1-.646 1.182c-.09.138-.177.274-.277.408-.034.047-.2.272-.048.068.152-.205-.058.072-.095.12-.223.275-.458.54-.706.797a15.878 15.878 0 0 1-1.267 1.191l-.25.205c-.031.027-.063.054-.096.078.314-.221.067-.053 0 0a28.72 28.72 0 0 1-5.295 3.13c-.286.135-.574.264-.863.39.217-.096-.127.053-.19.08l-.52.214c-.627.255-1.26.497-1.897.725-1.45.522-2.917.987-4.398 1.403-3.243.918-6.53 1.675-9.826 2.4-2.836.626-5.686 1.186-8.558 1.609l-.45.067-.145.02-.145.02a78.1 78.1 0 0 1-2.958.344 84.66 84.66 0 0 1-3.918.272 73.222 73.222 0 0 1-7.954-.114 90.418 90.418 0 0 1-4.236-.388 93.064 93.064 0 0 1-2.295-.286l-.12-.017c.13.017-.176-.025-.194-.027l-.53-.074c-.433-.063-.866-.128-1.298-.196-5.514-.85-11.12-1.94-16.309-4.092l-.353-.147h.022l-.194-.085a29.804 29.804 0 0 1-2.17-1.077 20.34 20.34 0 0 1-2.379-1.543l-.136-.105c.023.018.242.2.067.053l-.227-.181a9.908 9.908 0 0 1-.498-.44c-.303-.278-.591-.573-.865-.882-.137-.154-.266-.314-.397-.473-.176-.214.018.032 0 0-.063-.093-.132-.181-.196-.276a9.14 9.14 0 0 1-.833-1.468l-.06-.134c-.072-.156-.02.067.051.125-.042-.035-.074-.182-.091-.238a9.081 9.081 0 0 1-.323-1.077 1.372 1.372 0 0 0-.626-.814 1.31 1.31 0 0 0-1.002-.136c-.335.101-.62.332-.792.645-.172.312-.22.681-.133 1.029.883 3.752 3.843 6.432 7.021 8.22 4.632 2.603 9.935 3.914 15.084 4.914 6.053 1.179 12.234 2.004 18.401 2.063 5.61.057 11.184-.63 16.688-1.698 3.237-.63 6.449-1.378 9.652-2.165 3.203-.787 6.336-1.632 9.398-2.82 3.912-1.507 8.058-3.482 10.885-6.752 1.765-2.045 2.887-4.583 2.47-7.35-.571-3.765-2.895-7.052-5.855-9.246-2.076-1.539-4.534-2.538-7.02-3.12a26.276 26.276 0 0 0-9.191-.562c-3.615.452-7.237 1.68-10.082 4.085-.129.11-.257.221-.377.342h1.872c-1.304-1.707-2.916-3.197-4.589-4.508a10.307 10.307 0 0 0-2.34-1.45 10.507 10.507 0 0 0-2.333-.679c-1.725-.3-3.475-.342-5.22-.335-3.571.015-7.195.323-10.451 1.938a16.773 16.773 0 0 0-3.553 2.319c-.55.48-1.071 1.002-1.597 1.51-.8.771-1.594 1.546-2.385 2.324-.519.511-1.173 1.01-1.449 1.71l1.942-.813c-2.206-1.352-4.377-2.786-6.81-3.676a12.997 12.997 0 0 0-3.868-.785c-1.236-.058-2.494.125-3.717.326-4.538.75-9.252 2.821-11.45 7.226A13.575 13.575 0 0 0 .32 44.792c.16.716.96 1.138 1.63.95.332-.103.613-.334.785-.644.17-.31.219-.677.134-1.023Z"
        fill="#231815"
      />
      <Path
        d="M37.422 38.172c-.425-.566-1.203-.627-1.796-.324a1.593 1.593 0 0 0-.641.608 1.652 1.652 0 0 0-.157 1.312c.064.273.216.517.432.69.184.174.398.31.632.4a.86.86 0 0 0 .54-.023.887.887 0 0 0 .426-.34 1.7 1.7 0 0 0 .47-.506c.317-.519.48-1.306.094-1.817Z"
        fill="#040001"
      />
      <Path
        d="M37.516 38.07a1.55 1.55 0 0 0-.791-.501 1.517 1.517 0 0 0-.928.052 1.73 1.73 0 0 0-.788.566 1.802 1.802 0 0 0-.18 1.945c.191.328.474.59.811.753a.967.967 0 0 0 .909.038c.14-.072.265-.171.367-.294.118-.141.275-.24.392-.39.447-.567.685-1.51.23-2.14-.101-.14-.33 0-.228.135.337.472.215 1.126-.052 1.603a1.782 1.782 0 0 1-.27.362c-.061.062-.132.11-.196.167-.063.058-.086.102-.132.15a.7.7 0 0 1-.733.203 1.795 1.795 0 0 1-.767-.558 1.526 1.526 0 0 1-.037-1.677c.149-.235.358-.423.605-.542.264-.137.564-.18.855-.122.29.058.553.214.746.443.108.144.293-.05.187-.194ZM45.75 39.976a3.435 3.435 0 0 0 .116-.157c.163-.25.255-.542.268-.843a.743.743 0 0 0-.023-.216 1.56 1.56 0 0 0-.226-.594 1.515 1.515 0 0 0-.441-.448 1.47 1.47 0 0 0-1.2-.19 1.428 1.428 0 0 0-.663.398c-.182.191-.31.43-.37.69-.058.303-.035.617.066.907a1.026 1.026 0 0 0 .466.665 1.432 1.432 0 0 0 1.55.156c.164-.081.312-.195.435-.335l.021-.033Z"
        fill="#040001"
      />
      <Path
        d="M45.843 40.071a1.692 1.692 0 0 0 .176-1.945 1.683 1.683 0 0 0-.648-.605 1.584 1.584 0 0 0-1.725.151c-.25.197-.44.465-.544.771a1.92 1.92 0 0 0 .034 1.106c.09.321.29.597.564.776a1.606 1.606 0 0 0 2.13-.254c.117-.127-.07-.319-.186-.192a1.376 1.376 0 0 1-.74.44 1.35 1.35 0 0 1-.849-.09 1.248 1.248 0 0 1-.612-.578c-.129-.3-.173-.631-.13-.956.053-.266.182-.51.37-.7.19-.19.43-.318.69-.366.238-.044.483-.024.712.059.228.083.432.225.59.413a1.39 1.39 0 0 1-.024 1.778c-.104.133.083.327.192.192ZM44.13 45.465c-1.104 2.11-4.46 2.779-5.616.386-.654-1.36-2.635-.167-1.98 1.19 1.919 3.971 7.692 3.219 9.577-.387.699-1.334-1.281-2.527-1.98-1.19Z"
        fill="#040001"
      />
      <Path
        d="M44.016 45.397c-.847 1.588-3.19 2.505-4.686 1.29a2.425 2.425 0 0 1-.494-.543c-.133-.198-.217-.424-.362-.611a1.084 1.084 0 0 0-.451-.34 1.055 1.055 0 0 0-.557-.063c-.798.116-1.39.967-1.13 1.772.168.45.417.864.733 1.22.282.34.61.639.974.884a5.057 5.057 0 0 0 2.445.82 6.119 6.119 0 0 0 2.62-.394 6.252 6.252 0 0 0 2.228-1.47c.316-.331.59-.701.816-1.102a1.383 1.383 0 0 0 .151-1.23c-.28-.714-1.21-1.154-1.876-.705a1.325 1.325 0 0 0-.411.472.14.14 0 0 0 .048.187.13.13 0 0 0 .1.014.134.134 0 0 0 .081-.063.908.908 0 0 1 .395-.415.874.874 0 0 1 .558-.09c.18.034.348.11.493.221.146.112.263.258.344.425.194.419.032.812-.189 1.178a5.245 5.245 0 0 1-.803 1.023 5.998 5.998 0 0 1-2.095 1.325c-.78.289-1.608.41-2.435.354a4.768 4.768 0 0 1-2.276-.745 4.331 4.331 0 0 1-.95-.842 3.522 3.522 0 0 1-.705-1.163c-.228-.747.507-1.601 1.267-1.39.443.124.56.588.802.93.231.335.533.61.882.81 1.447.799 3.376.168 4.365-1.101.127-.163.24-.337.338-.52.09-.154-.137-.292-.22-.138Z"
        fill="#040001"
      />
      <Path
        d="M40.486 24.486c-.882-4.828-1.187-7.75-.923-12.656a1.246 1.246 0 0 1 .203-.744c.187-.224.5-.277.786-.317 3.856-.526 6.662-.986 10.533-1.383.478-.049 1.045-.062 1.343.326.236.307.201.744.15 1.132a70.416 70.416 0 0 1-.657 4.151c-.056.3-.123.618-.335.832a1.435 1.435 0 0 1-.785.328c-1.155.218-2.323.34-3.49.46-3 .31-4.292.62-7.285.933"
        fill="#F7C194"
      />
      <Path
        d="M41.76 24.125a83.6 83.6 0 0 1-.646-4.023l.046.363a42.456 42.456 0 0 1-.353-4.232 44.733 44.733 0 0 1-.01-2.228c-.008-.822.028-1.644.107-2.462l-.047.363c.015-.094.04-.186.072-.274l-.134.325c.069-.15.15-.153-.055.047l-.166.13a.725.725 0 0 1 .117-.062l-.316.137c.17-.065.349-.107.53-.126l-.354.05c1.885-.258 3.767-.534 5.648-.795l-.353.05c.984-.136 1.968-.264 2.951-.385.52-.062 1.036-.122 1.555-.181.467-.08.94-.11 1.412-.087l-.353-.05c.118.017.233.047.344.09l-.317-.136c.132.061.259.217-.027-.057.09.096.06.053-.088-.13a.742.742 0 0 1 .062.118l-.133-.325c.032.084.055.17.07.26l-.047-.363c.022.262.012.527-.032.787l.048-.363a82.358 82.358 0 0 1-.549 3.535 5.43 5.43 0 0 1-.245 1.073l.134-.326a.806.806 0 0 1-.063.123c.146-.181.176-.214.082-.11.306-.269.11-.086 0-.03l.316-.135a3.757 3.757 0 0 1-.81.197c-.325.057-.65.106-.976.15l.353-.048c-1.32.181-2.647.288-3.97.459-1.141.146-2.278.32-3.418.478l.353-.049c-.823.113-1.647.212-2.47.3-.35.01-.682.151-.936.396a1.399 1.399 0 0 0-.389.963c.03.674.586 1.436 1.324 1.36 1.73-.181 3.449-.444 5.172-.682l-.353.049c1.79-.246 3.59-.384 5.376-.65 1.036-.155 2.174-.318 2.696-1.397.2-.474.332-.974.394-1.486.085-.47.164-.941.238-1.41.074-.47.145-.944.212-1.417.098-.515.157-1.038.176-1.562-.01-.637-.217-1.302-.706-1.73a2.536 2.536 0 0 0-1.66-.62c-.396.005-.79.037-1.181.096a139.288 139.288 0 0 0-3.788.464c-1.964.263-3.925.553-5.888.825l.353-.049c-.764.105-1.537.132-2.142.694-.605.563-.666 1.364-.706 2.149a54.45 54.45 0 0 0-.07 3.129c.027 1.993.185 3.982.472 5.954.177 1.198.373 2.393.588 3.584.127.7.988 1.162 1.63.95.728-.243 1.058-.923.922-1.674l-.002.006Z"
        fill="#040000"
      />
    </G>
    <Path
      d="M74.5 31.055c7.585 0 13.75-6.104 13.75-13.653S82.085 3.75 74.5 3.75 60.75 9.853 60.75 17.402c0 7.55 6.165 13.653 13.75 13.653Z"
      fill="#FF6E40"
      stroke="#fff"
      strokeWidth={2.5}
    />
    <Path
      d="m79.5 14.165-6.296 7.37L69.5 16.62"
      stroke="#FAFAFA"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(0 8)" d="M0 0h90v52H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export { SuccessIcon };

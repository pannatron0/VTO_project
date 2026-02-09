import styles from './Button.module.css';

const Button = () => {
  const svgStyle = {
    shapeRendering: 'geometricPrecision',
    textRendering: 'geometricPrecision',
    imageRendering: 'optimizeQuality',
    fillRule: 'evenodd',
    clipRule: 'evenodd'
  } as React.CSSProperties;

  return (
    <div className={styles.wrapper}>
      <button>
        Button
        <div className={styles.star1}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53">
            <g id="Layer_x0020_1">
              <path className={styles.fil0} d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
            </g>
          </svg>
        </div>
        <div className={styles.star2}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53">
            <g id="Layer_x0020_1">
              <path className={styles.fil0} d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
            </g>
          </svg>
        </div>
        <div className={styles.star3}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53">
            <g id="Layer_x0020_1">
              <path className={styles.fil0} d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
            </g>
          </svg>
        </div>
        <div className={styles.star4}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53">
            <g id="Layer_x0020_1">
              <path className={styles.fil0} d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
            </g>
          </svg>
        </div>
        <div className={styles.star5}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53">
            <g id="Layer_x0020_1">
              <path className={styles.fil0} d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
            </g>
          </svg>
        </div>
        <div className={styles.star6}>
          <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" style={svgStyle} viewBox="0 0 784.11 815.53">
            <g id="Layer_x0020_1">
              <path className={styles.fil0} d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" />
            </g>
          </svg>
        </div>
      </button>
    </div>
  );
}

export default Button;
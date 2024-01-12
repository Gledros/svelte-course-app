export const longpress = (node, options) => {
  let timer;

  const handleMouseDown = () => {
    const { duration = 2000 } = options;

    console.log(options, duration);
    timer = setTimeout(() => {
      node.dispatchEvent(new CustomEvent('longpress'));
    }, duration);
  };

  const handleMouseUp = () => {
    clearTimeout(timer);
  };

  node.addEventListener('mousedown', handleMouseDown);
  node.addEventListener('mouseup', handleMouseUp);

  return {
    update: (newOptions) => {
      console.log(newOptions);
      options = newOptions;
    },
    destroy: () => {
      console.log('destroyed');
      clearTimeout(timer);
      node.removeEventListener('mousedown', handleMouseDown);
      node.removeEventListener('mouseup', handleMouseUp);
    },
  };
};

export default longpress;

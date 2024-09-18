export const scrollToBottom = (elementRef: React.RefObject<HTMLElement>) => {
  if (elementRef.current) {
    elementRef.current.scrollTop = elementRef.current.scrollHeight;
  }
};
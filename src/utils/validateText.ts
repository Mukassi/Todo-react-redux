export const validateText = (
  text: string
): { isValid: boolean; exceededNum: number } => {
  const exceededNum = text.trim().length - 160;
  if (exceededNum > 0) {
    return { isValid: false, exceededNum };
  } else {
    return { isValid: true, exceededNum };
  }
};

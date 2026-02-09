// Telefon raqamni formatlash va tozalash
export const formatPhone = (value: string) => {
  const v = value.replace(/\D/g, "").slice(0, 9);
  return [v.slice(0, 2), v.slice(2, 5), v.slice(5, 7), v.slice(7, 9)]
    .filter(Boolean)
    .join(" ");
};

export const getFullPhone = (value: string) => {
  const digitsOnly = value.replace(/\D/g, "").slice(0, 9);
  return digitsOnly.startsWith("998") ? `+${digitsOnly}` : `+998${digitsOnly}`;
};

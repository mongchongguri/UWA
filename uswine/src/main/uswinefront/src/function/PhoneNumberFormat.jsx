function PhoneNumberFormant(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, ""); // 숫자 이외의 문자 제거
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }

  return phoneNumber; // 변환에 실패하면 원래 번호 그대로 반환
}

export default PhoneNumberFormant;

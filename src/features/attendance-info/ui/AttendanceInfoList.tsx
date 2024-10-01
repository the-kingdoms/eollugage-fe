export default function AttendanceInfoList() {
  const data: unknown[] = []
  if (data.length === 0) {
    return (
      <div className="w-full pt-[120px] flex items-center justify-center">
        <p className="text-[##6F6F6F] body-02-medium">근무 정보가 아직 없어요</p>
      </div>
    )
  }
  return <div>ff</div>
}

interface HeaderProps {
  title: string
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="w-full fixed top-0 bg-black text-white body-03-bold-compact pt-6 pl-4 pb-4">
      {title}
    </div>
  )
}

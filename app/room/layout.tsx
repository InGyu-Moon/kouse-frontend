import SearchRoomType from "../../components/searchRoomType"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <>
      <SearchRoomType />
      {children}
    </>
  )
}
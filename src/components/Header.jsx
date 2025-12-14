const Header = () => {
  return (
    <header className="bg-red-100">
      <div className="mx-auto flex max-w-[1200px] h-16 items-center justify-between px-4 py-2 text-red-800">
          <p className="text-sm font-medium">23120102</p>

          <h1 className="text-2xl font-semibold">
            Movies info
          </h1>

          <button className="text-lg">
            ⚙️
          </button>
      </div>
    </header>  
  )
}

export default Header
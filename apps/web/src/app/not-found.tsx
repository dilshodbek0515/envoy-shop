const NotFound = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <p
        style={{
          fontSize: '100px',
          color: 'red'
        }}
      >
        404
      </p>
      <span>Not found</span>
    </div>
  )
}

export default NotFound

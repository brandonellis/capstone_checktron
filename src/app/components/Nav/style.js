export default {
  navbar: {
    outline: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#2c97de',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    borderBottomColor: '#3880BF',
    //keep it at top of screen, make sure body has top padding to support this
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1030,
    boxSizing: 'border-box',
    WebkitAppRegion: 'drag'
  },
  navbarItem: {
    cursor: 'pointer',
    display: 'block',
    height: 60,
    paddingLeft: 8,
    paddingRight: 8,
    float: 'left',
  },
  navbarText: {
    color: 'white',
    marginTop: 19,
    fontSize: 14
  },
  navbarImage: {
    width: 30,
    height: 30,
    marginTop: 15,
    display: 'block',
  },
  navbarLeft: {
    float: 'left',
    WebkitAppRegion: 'no-drag'
  },
  navbarRight: {
    float: 'right',
    marginTop: 17,
    marginRight: 5,
    WebkitAppRegion: 'no-drag',
  },
  winIcon: {
    paddingLeft: 2,
    paddingRight: 2,
  }
}

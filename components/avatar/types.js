export const AvatarTypes = (theme) => {
  return ({
    _base: {
      container: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      image: {
        width: 40,
        height: 40
      }
    },
    big: {
      image: {
        width: 110,
        height: 110,
        borderRadius: 55,
        marginBottom: 19
      },
      container: {
        flexDirection: 'column'
      }
    },
    small: {
      image: {
        width: 32,
        height: 32,
        borderRadius:16
      }
    },
    circle: {
      image: {
        borderRadius: 20
      },
    }
  })
};

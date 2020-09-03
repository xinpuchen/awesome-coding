const root = {
  val: 5,
  left: {
    val: 4,
    left: {
      val: 11,
      left: {
        val: 7,
        left: null,
        right: null,
      },
      right: {
        val: 2,
        left: null,
        right: null,
      },
    },
  },
  right: {
    val: 8,
    left: {
      val: 13,
      left: null,
      right: null,
    },
    right: {
      val: 4,
      left: null,
      right: {
        val: 1,
        left: null,
        right: null,
      },
    },
  },
};
const head = {
  val: 1,
  next: {
    val: 4,
    next: {
      val: 5,
      next: {
        val: 9,
        next: null,
      },
    },
  },
};
const head1 = {
  val: 2,
  next: {
    val: 3,
    next: {
      val: 7,
      next: {
        val: 8,
        next: null,
      },
    },
  },
};
const head2 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: {
        val: 4,
        next: {
          val: 5,
          next: {
            val: 6,
            next: {
              val: 7,
              next: null
            }
          }
        }
      }
    }
  }
}
const matrix = [
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
];

module.exports = {
  root,
  head,
  head1,
  head2,
  matrix
};

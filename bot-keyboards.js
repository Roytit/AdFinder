const startKeyboard = {
    reply_markup: {
      keyboard: [
        [
          {
            text: 'Users',
          },
        ],
        [
          {
            text: 'Agreements',
          },
        ],
        [
          {
            text: 'Ads',
          },
        ],
      ],
    },
  };

const usersKeyboard = {
    reply_markup: {
        keyboard: [
        [
            {
                text: 'Get all users',
            },
        ],
        [
            {
                text: 'Get user by ID',
            },
        ],
        [
            {
                text: 'Back',
            },
        ]
        ],
    },
};

const adsKeyboard = {
    reply_markup: {
        keyboard: [
        [
            {
                text: 'Get all ads',
            },
        ],
        [
            {
                text: 'Get ad by ID',
            },
        ],
        [
            {
                text: 'Back',
            },
        ]
        ],
    },
};

const agreementsKeyboard = {
    reply_markup: {
        keyboard: [
        [
            {
                text: 'Get all agreements ads',
            },
        ],
        [
            {
                text: 'Get agreement by ID',
            },
        ],
        [
            {
                text: 'Back',
            },
        ]
        ],
    },
};

module.exports = {
    startKeyboard,
    usersKeyboard,
    adsKeyboard,
    agreementsKeyboard
}

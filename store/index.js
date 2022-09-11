export const testStore = defineStore('counter', {
  state: () => ({
    // questions: [],
    // amount: "10",
    category: '',
    difficulty: '',
    type: '',
    total: 0,
    questionNumber: 0,
    score: 0,
  }),
  getters: {
    // doubleCount: (state) => state.count * 2,
    getparamater(state) {
      return (
        '?amount=' +
        state.total +
        '&category=' +
        state.category +
        '&difficulty=' +
        state.difficulty +
        '&type=' +
        state.type
      )
    },
    // getQuestions(state) {
    //   const {
    //     data: categories,
    //     pending,
    //     error,
    //     refresh,
    //   } = useAsyncData('', () =>
    //     $fetch('https://opentdb.com/api.php' + state.getparamater)
    //   )

    //   state.questions = categories.value?.results
    //   return state.questions
    // },
  },
  actions: {},
})

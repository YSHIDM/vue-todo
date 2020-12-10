<template>
  <div id="hh">
    <p>
      Ask a yes/no question:
      <input v-model="question">
    </p>
    <p>{{ answer }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'appMain'
})

export default class Todo extends Vue {
  public data(){
    return {
      question: '',
      answer: 'I cannot give you an answer until you ask a question!'
    }
  }
  /**
   * created
   */
  public created() {

  }
  /**
   * computed
   */
  public computed() {

  }
  /**
   * methods
   */
  public methods(){
    // return {
    // getAnswer:() => {
    //   if (this.question.indexOf('?') === -1) {
    //     this.answer = 'Questions usually contain a question mark. ;-)'
    //     return
    //   }
    //   this.answer = 'Thinking...'
    //   // var vm = this

    // }
    // }
  }

}

// const watchExampleVM = new Vue({
//   el: '#hh',
//   watch: {
//     // 如果 `question` 发生改变，这个函数就会运行
//     question(newQuestion, oldQuestion) {
//       console.log('newQuestion, oldQuestion :>>', newQuestion, oldQuestion)
//       this.answer = 'Waiting for you to stop typing...'
//     }
//   },

//   methods: {
//     getAnswer() {
//       if (this.question.indexOf('?') === -1) {
//         this.answer = 'Questions usually contain a question mark. ;-)'
//         return
//       }
//       this.answer = 'Thinking...'
//       // var vm = this

//     }
//   }
// })


</script>

<style>

</style>

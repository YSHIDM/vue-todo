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
import {namespace} from "vuex-class";

const rMd = namespace("roleStore");

@Component({
  name: 'appMain'
})

export default class Todo extends Vue {
  @rMd.Action('getAllTodoAction')
  private getAllTodoAction!: () => Promise<HttpRes<Array<TodoModel.TodoData>>>

  public async created() {
    const data = await this.getAllTodoAction();
    console.log('data :>>', data)
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

</script>

<style>

</style>

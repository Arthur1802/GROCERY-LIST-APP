class Lists {
  constructor() {
    this.lists = []
  }

  addList(list) {
    this.lists.push(list)
  }

  removeList(list) {
    this.lists = this.lists.filter(l => l !== list)
  }

  getLists() {
    return this.lists
  }
}
/*
 * @Author: Sundream
 * @Date: 2017-08-12 15:11:21
 * @Last Modified by: Sundream
 * @Last Modified time: 2017-09-21 10:47:40
 */
const requestMethods = {
  data () {
    return {
      module: '',        // 模块名称
      tableData: [],     // 表格数据
      currentPage: 1,    // 当前页码，设置页码为 0 表示获取所有数据
      limit: 10,         // 每页数据条数
      total: 0,          // 数据总条数
      sort: null,        // 当前排序的字段
      sortFields: [],    // 可排序的字段数组 [{label: '', field: '', mode: 'Asc'}]
      isSearch: false,   // 是否需要在请求中生成搜索参数
      keywords: {},      // 可进行关键字搜索的字段 { field: value }
      filter: {},        // 当前需要筛选的字段
      filterFields: {},  // 所有可以筛选的字段 { field: { start, end } }
      filterMethods: [
        { label: '包含', value: '$like' },
        { label: '不包含', value: '$notLike' },
        { label: '等于', value: '$eq' },
        { label: '不等于', value: '$ne' }
      ]
    }
  },
  methods: {
    // 获取表格数据
    getList (url) {
      var isFilter = this.isFilter()
      if (this.sort === null && this.sortFields.length > 0) {
        this.sort = this.sortFields[0]
      }
      // 生成请求参数
      var data = {
        currentPage: this.currentPage,
        limit: this.limit,
        sort: this.sort,
        keywords: this.isSearch ? this.keywords : null,
        filter: isFilter ? this.filter : null
      }
      return this.$_POST(this.module + '/list', data).then(res => {
        if (res.status === 200) {
          this.tableData = res.data.list
          this.total = res.data.total
        } else {
          this.$toastMsg('error', '网络好像出了点问题！')
        }
      })
    },
    // 点击表格表头的排序事件处理程序
    remoteSort (data) {
      if (data.order) {
        var sort = this.sortFields.find(val => val.field === data.prop)
        var sortMode = data.order.indexOf('asc') > -1 ? 'Asc' : 'Desc'
        if (!sort) { return false }
        if (this.sort.field !== sort.field || this.sort.mode !== sortMode) {
          this.sort = sort
          this.sort.mode = sortMode
          this.getList()
        }
      }
    },
    // 工具栏操作事件处理程序
    handleTool (tool) {
      // 当搜索框内的字符为空时
      if (tool.sign === 'isSearch') {
        this.isSearch = false
        return false
      }
      // 重置筛选
      if (tool.sign === 'resetFilter') {
        this.filterFields = JSON.parse(tool.data)
        this.filterTool()
        return false
      }
      // 排序
      if (tool.sign === 'sort') {
        this.sort = tool.data
        this.sort.mode = this.sort.mode === 'Asc' ? 'Desc' : 'Asc'
      }
      // 搜索
      if (tool.sign === 'search') {
        this.searchTool(tool.data)
      }
      // 筛选
      if (tool.sign === 'filter') {
        this.filterTool()
      }
      this.getList()
    },
    // 页码改变事件处理程序
    currentPageChange(current) {
      this.currentPage = current
      this.getList()
    },
    // 处理筛选字段
    filterTool () {
      this.filter = {}
      for (let key in this.filterFields) {
        let item = this.filterFields[key]
        if (item.start !== null && item.end !== null && item.start !== undefined && item.end !== undefined) {
          this.filter[key] = {
            start: item.start,
            end: item.end
          }
        }
      }
    },
    // 处理搜索字段
    searchTool (value) {
      this.isSearch = (value !== '')
      for (let key in this.keywords) {
        this.keywords[key] = value
      }
    },
    // 查看是否有需要筛选的字段
    isFilter () {
      var isFilter = false
      // 查看是否有要筛选的字段
      for (let key in this.filter) {
        let item = this.filter[key]
        if (item.start !== null && item.end !== null) {
          isFilter = true
          break
        }
      }
      return isFilter
    }
  }
}
export default requestMethods

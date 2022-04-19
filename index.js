const axios = require('axios');


function Client(addr) {
    this.addr = addr;

    function request(url, data) {

        return axios.post(addr + url, data)
    }

    /**
     *  添加文档
     *  @see https://gitee.com/tompeppa/gofound/blob/main/docs/api.md#%E5%A2%9E%E5%8A%A0%E4%BF%AE%E6%94%B9%E7%B4%A2%E5%BC%95
     * @param id 文档id
     * @param text 文本内容
     * @param document 文档内容
     * @returns {Promise<AxiosResponse<any>>}
     */
    this.addDocument = function (id, text, document) {
        return request('/index', {
            id: id,
            text: text,
            document: document
        });
    }

    /**
     * 查询索引
     * @see https://gitee.com/tompeppa/gofound/blob/main/docs/api.md#%E6%9F%A5%E8%AF%A2%E7%B4%A2%E5%BC%95
     * @param query 关键词
     * @param page 页码
     * @param limit 每页数量
     * @param order 排序，ASC、DESC
     * @param highlight 高亮，{"preTag":"<span style='color:red'>","postTag":"</span>"}
     * @returns {Promise<AxiosResponse<any>>}
     */
    this.query = function (query, page = 1, limit = 10, order = "desc", highlight = null) {
        return request("/query", {
            query: query,
            page: page,
            limit: limit,
            order: order,
            highlight: highlight
        })
    }

    /**
     * 删除索引
     * @see https://gitee.com/tompeppa/gofound/blob/main/docs/api.md#%E5%88%A0%E9%99%A4%E7%B4%A2%E5%BC%95
     * @param id 文档id
     * @returns {Promise<AxiosResponse<any>>}
     */
    this.removeDocument = function (id) {
        return request("/remove", {
            id: id
        })
    }
}

module.exports = Client;
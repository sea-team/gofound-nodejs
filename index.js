const axios = require('axios');


function Client(addr, database, auth) {
    this.addr = addr;

    this.database = database;
    this.auth = auth;

    this.request=function (url, data) {
        // basic auth
        let self = this;

        //数据库
        if (self.database) {
            if (url.indexOf("?") === -1) {
                url = url + "?database=" + self.database;
            } else {
                url = url + "&database=" + self.database;
            }
        }

        let apiUrl=self.addr + url;

        return axios({
            method: 'post',
            url: apiUrl,
            data: data,
            auth: self.auth ? self.auth : null
        })
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
        return this.request('/index', {
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
        return this.request("/query", {
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
        return this.request("/remove", {
            id: id
        })
    }
}

module.exports = Client;

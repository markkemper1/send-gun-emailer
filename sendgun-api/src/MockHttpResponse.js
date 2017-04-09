
class MockHttpResponse {
    constructor() {
        this.status = this.status.bind(this);
        this.end = this.end.bind(this);
        this.json = this.json.bind(this);
    }
    status(code) {
        this._statusCode = code;
    }
    json(item) {
        this._json = item;
    }
    end() {
        this._end = true;
    }
}

export default MockHttpResponse
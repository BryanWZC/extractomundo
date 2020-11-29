const extractLinks = require('./components/extract');
const handleLoad = require('./components/handleLoad');

class Emundo {
    constructor(props) {
        this.props = props;
    }
    async links() {
        this.validate();
        return await extractLinks(this.props);
    }
    async download() {
        this.validate();
        await handleLoad(this.props);
    }
    validate() {
        const props = this.props;
        if(!props) throw new Error('props is not defined');
        if(!props.url || !props.path || !props.selector) 
            throw new Error('required props fields are not defined');
    }
}

module.exports = Emundo;
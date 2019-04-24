const TM = TweenMax
const _id = id => document.getElementById(id)
const _class = c => document.getElementsByClassName(c)
const _childClass = (p, c) => {
    for (let i = 0; i < p.childNodes.length; i++) {
        if (p.childNodes[i].className == c) {
          return p.childNodes[i];
        }        
    }
}
const _tag = t => document.getElementsByTagName(t)
const toss = () => Math.random() > 0.5? -1 : 1
const TemplateEngine =  async (html, options) => {
    let re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
    let add = function(line, js) {
        js? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while(match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true)
        cursor = match.index + match[0].length
    }
    add(html.substr(cursor, html.length - cursor))
    code += 'return r.join("");'
    console.log('done')
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options)
}

class StateMachine {
    constructor() {
        this.states = []
        this.currentState = ''
        this.stateFunctions = []
        this.addState = this.addState.bind(this)
        this.bindState = this.bindState.bind(this)
    }
    addState(state, func) {
        if(!this.states.includes(state)) {
            this.states.push(state);
            this.stateFunctions.push(func)
        }else {
            console.error(`state ${state} alerady exists`)
        }
    }
    bindState(state){
        console.log(`bound state: ${state}`)
        let i = this.states.indexOf(state)
        if(i !== -1) {
            this.stateFunctions[i]()
            this.currentState = state
        }
        return null 
    }
    getFunction(state) {
        let i = this.states.indexOf(state)
        if(i !== -1) {
            return this.stateFunctions[i]
        }
        return null
    }
};



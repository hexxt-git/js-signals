class Writable{
    constructor(value, ...subscribers){
        this.value = value;
        this.subscribers = []
        subscribers.forEach(this.subscribe)
    }
    subscribe(fn){
        if(typeof fn !== 'function'){
            console.error('MUST SUBSCRIBE WITH FUNCTION', this, fn)
            return 0
        }
        this.subscribers.push(fn)
    }
    set(value){
        this.value = value;
        this.subscribers.forEach(subscriber => subscriber(value))
        return value
    }
    get(){
        return this.value
    }
    update(fn){
        this.set(fn(this.value))
    }
    clear(){
        this.subscribers = []
    }
}

// USAGE

const theme = new Writable('bright')

theme.subscribe(console.log)

theme.set('dark')
theme.set('dim')

theme.subscribe(theme => console.log(`theme has been set to ${theme}`))

theme.set('X')
theme.update(theme => theme.repeat(10))

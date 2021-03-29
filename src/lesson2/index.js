import React, { Children, Component, createRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

//lesson 2
const RenderProps = ({children}) => {
    return children({someProps: 'test'})
}

const withCounter = (ComponentProps) => {
    return class Hoc extends Component {
        render () {
            return <ComponentProps {...this.props} />
        }
    }
}

class Child extends Component {
    static propTypes = {
        counter: PropTypes.number.isRequired,
        handleChangrCounter: PropTypes.func.isRequired,
        // для типизации прихлдящего объекта
        state: PropTypes.shape({
            counter: PropTypes.number.isRequired
        }).isRequired
    }
    render () {
        return <div>Child</div>
    }
}

const TestComponent = withCounter(Child)

class Expample extends Component {
    // нужен для инициализации внутреннего состояния и привязки обработчиков к экземпляру 
    constructor (props) {
        // вызывает конструктор родителя
        super(props)
        // state видит только конкретный компонент
        this.state = {
            counter: 0
        }
        this.foo = this.foo.bind(this),
        this.ref = createRef() // имутабельный объект {current: div}
    }
    // можно не привязывать в конструкторе, елси написать стрелочную фунцию 
    // foo = () => { }
    foo () {}

    // статический метод не имеет доступа к this 
    static getDerivedStateFromProps (props, state) {
        return null
    }

    shouldComponentUpdate (nextProps, nextState) {
        // должен вернуть bool: false - запретит обновление
        return true
    }

    getSnapshotBeforeUpdate (prevProps, prevState) {
        return {}
    }

    componentDidUpdate (prevProps, prevState, snapshot) {
        // позволяет брать информацию из DOM
    }

    componentWillUnmount () {
        // alert('Bye!')
        // выполняется перед удалением
    }

    handleChangrCounter = () => {
        // функция которая меняет state
        // or
        // предпочтительнее этот вариант чтобы не было конфликтов с this
        // второй необязательный параметр - callback-функция, которая вызовется после обновления состояния
        this.setState((state) => ({counter: ++state.counter}), () => {
            console.log('setState')
        })
        // or
        // this.setState({counter: ++this.state.counter})


        // // в этом случае выполнится только последнее обновление и будет +3
        // this.setState({counter: this.state.counter + 1})
        // this.setState({counter: this.state.counter + 2})
        // this.setState({counter: this.state.counter + 3})
        // // в таком случае все обновления попадут в очередь и будет +6
        // this.setState((state) => ({counter: state.counter + 1}))
        // this.setState((state) => ({counter: state.counter + 2}))
        // this.setState((state) => ({counter: state.counter + 3}))
        // // в обоих случаях render выполняется 1 раз

        // +6 и 3 вызова render
        // setTimeout(() => {
        //     this.setState({counter: this.state.counter + 1})
        //     this.setState({counter: this.state.counter + 2})
        //     this.setState({counter: this.state.counter + 3})
        // }, 1000)

        // +3 и 1 render
        // setTimeout(() => {
        //     ReactDOM.unstable_batchedUpdates(() => {
        //         this.setState({counter: this.state.counter + 1})
        //         this.setState({counter: this.state.counter + 2})
        //         this.setState({counter: this.state.counter + 3})
        //     })
        // }, 1000)

        // мутация 
        // обновления не произойдет, тк мы не меняем ссылку на объект
        // this.state.counter = ++this.state.counter
        // для принудительного обновления
        // this.forceUpdate()
    }

    // возвращает react-элемент
    render () {
        const { counter } = this.state

        console.log(this.props)

        return <div ref={this.ref}>
                <h1>Hello! {counter}</h1>
                <button onClick={this.handleChangrCounter}>Click</button>
                {/* передаем состояние дочернему компоненту */}
                {/* можно передать и функцию, только таким способом можно обновить состояние родителя из дочернего компонента */}
                <TestComponent
                    state={this.state }
                    counter={counter}
                    handleChangrCounter={this.handleChangrCounter}
                />
            </div>
    }

    // вызывается после того как react выполнил render, но до того как браузер сделает перерисовку
    // подходит для сетевых запросов
    componentDidMount () {
        console.log(this.ref)
    }
}

// React.memo - для оптимизации
// const Child = React.memo(({ counter, handleChangrCounter }) => {
//     return <h3 onClick={handleChangrCounter}>Child { counter }</h3>
// })


class Wrapper extends Component {
    state = {
        isVisible: true
    }

    handleShowComponent = () => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }

    render () {
        // throw Error('Some error')
        return (
            <div>
                <button onClick={this.handleShowComponent}>Hide</button>
                {this.state.isVisible ? <Expample /> : null}
            </div>
        )
    }
}

class ErrorBoundary extends Component {
    state = { hasError: false }

    componentDidCatch (error, info) {
        // отлавливает ошибки render у дочернего компонента
        console.error(error)
        this.setState({ hasError: true })
    }
    render () {
        if (this.state.hasError) return <h1>Oops...</h1>
        return this.props.children
    }
}

ReactDOM.render(
    // <ErrorBoundary>
        // <Wrapper />
    // </ErrorBoundary>
    <RenderProps>
        {
            (props) => <Expample {...props} />
        }
    </RenderProps>
    ,
    document.querySelector('#root')
)

// Монтирование:
// -constructor
// -static getDerivedStateFromProps
// -render()
// -componentDidMount()
// Браузер делает отрисовку

// Обновление:
// происходит, когда у компонента меняется состояние или props
// -static getDerivedStateFromProps
// -shouldComponentUpdate
// -render()
// -getSnapshoutBeforeUpdate
// -componentDidUpdate
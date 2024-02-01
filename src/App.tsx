import './App.css'
import {Tree} from './toolkit/components'

function App() {

  return (
    <>
      <Tree
        nodeRenderer={
          (props) => (
            <Tree.Node
              isSelectable
              {...props}
            />
          )
        }
        nodes={{
          data: [
            {
              id: "1",
              name: "1",
              parentId: null
            },
            {
              id: "2",
              parentId: "1"
            },
            {
              id: "3",
              parentId: null
            }
          ]
        }}
      />
    </>
  )
}

export default App

import React, { type ChangeEvent } from "react";
import "./ParamEditor.css";

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Color {
  id: number;
  name: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      paramValues: this.initializeParamValues()
    };
  }

  private initializeParamValues(): ParamValue[] {
    const {params, model} = this.props;

    return params.map(param => {
      const existingValue = model.paramValues.find(pv => pv.paramId === param.id);
      return {
        paramId: param.id,
        value: existingValue ? existingValue.value : ''
      };
    });
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState(prevState => ({
      paramValues: prevState.paramValues.map(pv =>
        pv.paramId === paramId ? {...pv, value} : pv
      )
    }));
  };

  public getModel(): Model {
    return {
      paramValues: [...this.state.paramValues],
      colors: [...this.props.model.colors]
    };
  }

  render() {
    const {params} = this.props;
    const {paramValues} = this.state;

    return (
      <div>
        {params.map(param => {
          const paramValue = paramValues.find(pv => pv.paramId === param.id)?.value || '';

          return (
            <div key={param.id}>
              <div>{param.name}</div>
              <input 
                type="text"
                value={paramValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => this.handleParamChange(param.id, e.target.value)} />
            </div>
          );
        })}
      </div>
    );
  }

}

const App: React.FC = () => {
  const Params: Param[] = [
    {
      id: 1,
      name: "Назначение",
      type: 'string'
    },
    {
      id: 2,
      name: "Длина",
      type: 'string'
    },
  ];

  const Models: Model = {
    paramValues: [
      {
        paramId: 1,
        value: "Повседневное"
      },
      {
        paramId: 2,
        value: "Макси"
      },
    ],
    colors: [
      {
        id: 1,
        name: "Красный"
      },
      {
        id: 2,
        name: "Синий"
      }
    ]
  };

  return (
    <div>
      <h1>Редактор параметров</h1>
      <div className="ParamEditor">
        <ParamEditor
          params={Params}
          model={Models}
        />
      </div>
    </div>
  );
};

export default App;
export {ParamEditor};
export type {Param, ParamValue, Color, Model, Props};

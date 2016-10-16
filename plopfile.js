module.exports = function (plop) {
  var base = 'src/',
    path = {
    component: base+"app/components/{{dashCase name}}/"
  };

  // create your generators here
  plop.setGenerator('component', {
    description: 'generate a component',
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?"
      },
      {
        type: "input",
        name: "selector",
        message: "What is your selector name?"
      }
    ],
    actions: [
      {
        type: "add",
        path: path.component+"index.ts",
        template: "export * from './{{dashCase name}}.component';"
      },
      {
        type: "add",
        path: path.component+"{{dashCase name}}.component.ts",
        templateFile: "plop-templates/component/c.component.ts"
      },
      {
        type: "add",
        path: path.component+"{{dashCase name}}.template.html",
        template: "<!-- {{name}} component template -->"
      },
      {
        type: "add",
        path: path.component+"{{dashCase name}}.style.scss",
        template: "// {{name}} component style"
      },
      {
        type: "modify",
        pattern: /(declarations:*.\[)([^\]]+)(\])/gm,
        template: "$1$2  {{properCase name}}Component,\n  $3",
        path: base+'app/app.module.ts'
      },
      {
        type: "modify",
        pattern: /(\/\/ App Components)([^\]]+)(\/\/ END App Components)/gm,
        template: '$1$2import { {{properCase name}}Component } from "./components/{{dashCase name}}";\n$3',
        path: base+'app/app.module.ts'
      },
    ]
  });

  plop.setGenerator('route', {
    description: 'generate a route',
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your component name?"
      },
      {
        type: "input",
        name: "route",
        message: "What is your route?"
      }
    ],
    actions: [
      {
        type: "modify",
        pattern: /(export const ROUTES: Routes = \[)(\s.+)/gm,
        template: "$1$2\n  { path: '{{route}}', component: {{properCase name}}Component },",
        path: base+'app/app.routes.ts'
      },
      {
        type: "modify",
        pattern: /(\/\/ App Components)([^\]]+)(\/\/ END App Components)/gm,
        template: '$1$2import { {{properCase name}}Component } from "./components/{{dashCase name}}";\n$3',
        path: base+'app/app.routes.ts'
      },
    ]
  });
};

/** @jsx React.DOM */

define(
  [
    'react',
    './InstanceProjectItem.react',
    './VolumeProjectItem.react',
    'actions/projects',
    'backbone'
  ],
  function (React, InstanceProjectItem, VolumeProjectItem, ProjectActions, Backbone) {

    return React.createClass({

      propTypes: {
        project: React.PropTypes.instanceOf(Backbone.Model).isRequired,
        projects: React.PropTypes.instanceOf(Backbone.Collection).isRequired
      },

      confirmDelete: function () {
        ProjectActions.destroy(this.props.project);
      },

      render: function () {
        var self = this;
        var project = this.props.project;

        var content;
        if (project.isEmpty()) {

          var children = [
            React.DOM.span({className: 'no-project-items'},
              "Empty project. ")
          ];

          if (project.canBeDeleted()) {
            children.push(
              <a href="#" onClick={this.confirmDelete}>
                {"Delete " + project.get('name')}
              </a>
            );
          }
          content = <div>{children}</div>;

        } else {

          var items = [];

          items = items.concat(
            project.get('instances').map(function (instance) {
              return (
                <InstanceProjectItem
                  key={instance.id}
                  model={instance}
                  projects={self.props.projects}
                  project={project}
                />
              );
            })
          );

          items = items.concat(
            project.get('volumes').map(function (volume) {
              return (
                <VolumeProjectItem
                  key={volume.id}
                  model={volume}
                  projects={self.props.projects}
                  project={project}
                />
              );
            })
          );

          content = (
            <ul className="project-items container-fluid">
              {items}
            </ul>
          );
        }

        return (
          <div className="project-contents">
            {content}
          </div>
        );
      }

    });

  });
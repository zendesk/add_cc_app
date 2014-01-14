(function() {

  return {
    events: {
      'app.activated':'onAppActivated'
    },

    onAppActivated: function(app) {
      if (app.firstLoad) {
        _.defer(this.initialize.bind(this));
      }
    },

    initialize: function() {
      var ccs = this.ccs(),
          currentCCs = _.map(this.ticket().collaborators(), function(c) { return c.email(); });

      if (_.any(ccs)) {
        _.each(ccs, function(cc) {
          if (!_.contains(currentCCs, cc)) {
            this.ticket().collaborators().add({ email: cc });
          }
        }, this);
      }

    },

    ccs: function() {
      var ccsFieldLabel = helpers.fmt('custom_field_%@',
                                      this.setting('cc_field_id')),
          ccsFieldValue = this.ticket().customField(ccsFieldLabel) || "";

      return ccsFieldValue.split(' ');
    }

  };

}());

var localStorageAvailable = (typeof localStorage !== "undefined");

        function getValue(sortable) {
            var order = localStorage.getItem(sortable.options.category);
            return order ? order.split('|') : [];
        }

        function setValue(sortable) {
            var order = sortable.toArray();
            localStorage.setItem(sortable.options.category, order.join('|'));
        }

        function setupStore() {
            if (localStorageAvailable) {
                return {
                    get: getValue,
                    set: setValue
                };
            }
            return {}; 
        }

        function onAdd(evt) {
            setValue(this);
        }

        function applyState($section, categoryName) {
            if (localStorageAvailable) {
                var order = localStorage.getItem(categoryName);
                var itemIds = order ? order.split('|') : [];
                var $items = _.map(itemIds, function(itemId, index) {
                    return $("[data-id='" + itemId + "'");
                });
                $section.append($items);
            }
        }

        var options = {
          group: "listgroup",
          store: setupStore(),
          onAdd: onAdd,
          animation: 200,
          forceFallback: true,
          removeOnSpill: true
        }

        function init() {

          // applyState($(".wrapper"), "main");
          // applyState($(".overflow-wrapper"), "overflow");

        $(".lists").each(function(index, section) {
          var $section = $(section);
          var category = $section.attr("data-category");
          var sortableOptions = _.extend({}, options, { category: category });
          applyState($section, category);
          $section.data("twoColumnSortable", new Sortable(section, sortableOptions));
            });
        }

        init();
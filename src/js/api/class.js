import { isObject } from '../util/index';

export default function (UIkit) {

    var util = UIkit.util;

    ['add', 'remove', 'replace', 'has', 'toggle'].forEach(fn => {
        fn += 'Class';
        UIkit.prototype[`$${fn}`] = function (...args) { return apply(this.$options.el, args, fn); }
    });

    function apply(el, args, fn) {

        if (!isObject(args[0])) {
            args.unshift(el);
        }

        return util[fn].apply(null, args);
    }

};

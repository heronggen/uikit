import { flipPosition, isRtl, positionAt, removeClasses, toNumber } from '../util/index';

export default {

    props: {
        pos: String,
        offset: null,
        flip: Boolean,
        clsPos: String
    },

    defaults: {
        pos: !isRtl ? 'bottom-left' : 'bottom-right',
        flip: true,
        offset: false,
        clsPos: ''
    },

    computed: {

        pos() {
            return (this.$props.pos + (!~this.$props.pos.indexOf('-') ? '-center' : '')).split('-');
        },

        dir() {
            return this.pos[0];
        },

        align() {
            return this.pos[1];
        }

    },

    methods: {

        positionAt(element, target, boundary) {

            removeClasses(element, `${this.clsPos}-(top|bottom|left|right)(-[a-z]+)?`).css({top: '', left: ''});

            var offset = toNumber(this.offset) || 0,
                axis = this.getAxis(),
                {x, y} = positionAt(
                    element,
                    target,
                    axis === 'x' ? `${flipPosition(this.dir)} ${this.align}` : `${this.align} ${flipPosition(this.dir)}`,
                    axis === 'x' ? `${this.dir} ${this.align}` : `${this.align} ${this.dir}`,
                    axis === 'x' ? `${this.dir === 'left' ? -1 * offset : offset}` : ` ${this.dir === 'top' ? -1 * offset : offset}`,
                    null,
                    this.flip,
                    boundary
                ).target;

            this.dir = axis === 'x' ? x : y;
            this.align = axis === 'x' ? y : x;

            this.$toggleClass(element, `${this.clsPos}-${this.dir}-${this.align}`, this.offset === false);

        },

        getAxis() {
            return this.dir === 'top' || this.dir === 'bottom' ? 'y' : 'x';
        }

    }

}

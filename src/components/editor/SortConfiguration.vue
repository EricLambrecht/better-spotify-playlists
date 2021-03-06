<template>
  <b-modal headline="Sort settings" :show="show">
    <b-radio-button-group
      name="sortMode"
      label="Sort Mode"
      class="sort-mode"
      :options="sortModeOptions"
      :value="sortMode"
      @change="onSortModeChange"
    />
    <SortByTrackPropertyOptions
      v-show="sortMode === 'trackProperty'"
      @change="onOptionsChange"
    />
    <SortByAudioFeatureOptions
      v-show="sortMode === 'audioFeature'"
      @change="onOptionsChange"
    />
    <div slot="footer">
      <b-button-group>
        <b-button tertiary @click="onCloseClick">
          Close
        </b-button>
        <b-button primary @click="sort">
          Sort
        </b-button>
      </b-button-group>
    </div>
  </b-modal>
</template>

<script>
import 'vue-awesome/icons/sort'
import { mapActions } from 'vuex'

import SortByTrackProperty from '../../playlist-modifications/SortByTrackProperty'
import SortByTrackPropertyOptions from './SortByTrackPropertyOptions'
import SortByAudioFeature from '../../playlist-modifications/SortByAudioFeature'
import SortByAudioFeatureOptions from './SortByAudioFeatureOptions'

export default {
  name: 'SortConfiguration',
  components: { SortByAudioFeatureOptions, SortByTrackPropertyOptions },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: false,
      options: {
        order: 'ASC',
        sortBy: 'artists.0.name',
      },
      sortMode: 'trackProperty',
      sortModeMap: {
        trackProperty: SortByTrackProperty,
        audioFeature: SortByAudioFeature,
      },
      sortModeOptions: {
        trackProperty: 'Track Property',
        audioFeature: 'Audio Feature',
      },
    }
  },
  methods: {
    onCloseClick() {
      this.$emit('close')
    },
    onOptionsChange(options) {
      this.options = options
    },
    onSortModeChange(sortMode) {
      this.sortMode = sortMode
    },
    async sort() {
      this.showModal = false
      const confirmed = await this.askForConfirmation({
        headline: 'Sort',
        question: 'Are you sure you want to sort your playlist?',
        positive: 'Sort',
        negative: 'Cancel',
      })

      if (!confirmed) return

      await this.rearrangePlaylistWith({
        rearranger: this.sortModeMap[this.sortMode],
        options: this.options,
      })
    },
    ...mapActions('app', ['askForConfirmation']),
    ...mapActions('editor', ['rearrangePlaylistWith']),
  },
}
</script>

<style lang="scss" scoped>
.sort-mode {
  margin-bottom: 12px;
}

.toggle {
  margin: 0;
}

.fa-icon {
  color: var(--spotify-green);
  font-size: 18px;
  width: 18px;
}
</style>

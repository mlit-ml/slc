<template>
  <Popover class="relative">
    <nav id="menu" class="border-l-2 lg:border-none">
      <PopoverPanel static class="lg:hidden">
        <div class="bg-white divide-y-2 divide-gray-50">
          <div class="pt-5 pb-6 px-5">
            <div
              class="flex items-center justify-between"
              style="border: none !important"
            ></div>
            <div class="mt">
              <nav class="grid gap-y-8">
                <router-link
                  v-for="item in menuItems"
                  :key="item.name"
                  :to="item.page"
                  class="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                  @click.capture="toggleMenu"
                >
                  <component
                    :is="item.icon"
                    class="flex-shrink-0 h-6 w-6 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span class="ml-3 text-base font-medium text-gray-900">
                    {{ item.name }}
                  </span>
                </router-link>
              </nav>
            </div>
          </div>
          <div class="py-6 px-5 space-y-6">
            <div class="grid grid-cols-2 gap-y-4 gap-x-8">
              <a
                v-for="item in resources"
                :key="item.name"
                :href="item.href"
                class="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                {{ $t(item.name) }}
              </a>
            </div>
            <div>
              <a
                href="#"
                class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                @click="signOut"
              >
                {{ $t('Sign out') }}
              </a>
              <!-- <p class="mt-6 text-center text-base font-medium text-gray-500">
                Existing customer?
                {{ ' ' }}
                <a href="#" class="text-indigo-600 hover:text-indigo-500">
                  Sign in
                </a>
              </p> -->
            </div>
          </div>
        </div>
      </PopoverPanel>
    </nav>

    <main id="panel" ref="panel" @click="panelClicked">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          class="grid grid-cols-3 lg:flex items-center border-b-2 border-gray-100 lg:py-6 py-1 lg:justify-start lg:space-x-10"
        >
          <div class="lg:flex lg:w-0 lg:flex-1">
            <router-link
              v-if="pageHistory.previousPage.name != ''"
              :to="pageHistory.previousPage.path"
              class="flex items-start"
            >
              <span class="sr-only">{{ pageHistory.previousPage.name }}</span>
              <component
                :is="ChevronLeftIcon"
                class="flex-shrink-0 h-6 w-6 text-indigo-600"
                aria-hidden="true"
              />
              <div class="ml-2">
                <p
                  class="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {{ $t(pageHistory.previousPage.name!) }}
                </p>
              </div>
            </router-link>
          </div>

          <div class="lg:hidden flex justify-center text-gray-900">
            <h1>
              {{ $t(pageHistory.currentPage.name!) }}
            </h1>
          </div>
          <div class="lg:hidden flex justify-end">
            <PopoverButton
              :class="[
                isOpen ? 'ring-2 ring-inset ring-indigo-500' : '',
                'p-2 bg-white rounded-md text-gray-400 active:text-gray-500 active:bg-gray-100 outline-none',
              ]"
              @click.capture="toggleMenu()"
            >
              <span class="sr-only">{{ $t('Open menu') }}</span>
              <MenuIcon class="h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>
          <PopoverGroup as="nav" class="hidden lg:flex space-x-10">
            <Popover class="relative">
              <PopoverButton
                :class="[
                  isOpen
                    ? 'text-gray-900 ring-2 ring-offset-2 ring-indigo-500'
                    : 'text-gray-500',
                  'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 outline-none ',
                ]"
                @click.capture="toggleMenu()"
              >
                <span>{{ $t('Menu') }}</span>
                <ChevronDownIcon
                  :class="[
                    isOpen ? 'text-gray-600' : 'text-gray-400',
                    'ml-2 h-5 w-5 group-hover:text-gray-500',
                  ]"
                  aria-hidden="true"
                />
              </PopoverButton>
              <transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="translate-y-1 opacity-0"
                enter-to-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="translate-y-0 opacity-100"
                leave-to-class="translate-y-1 opacity-0"
              >
                <div>
                  <PopoverPanel
                    v-if="isOpen"
                    static
                    class="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                  >
                    <div
                      class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
                    >
                      <div
                        class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"
                      >
                        <router-link
                          v-for="item in menuItems"
                          :key="item.name"
                          :to="item.page"
                          class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                          @click.capture="toggleMenu"
                        >
                          <component
                            :is="item.icon"
                            class="flex-shrink-0 h-6 w-6 text-indigo-600"
                            aria-hidden="true"
                          />
                          <div class="ml-4">
                            <p class="text-base font-medium text-gray-900">
                              {{ $t(item.name) }}
                            </p>
                            <p class="mt-1 text-sm text-gray-500">
                              {{ $t(item.description) }}
                            </p>
                          </div>
                        </router-link>
                      </div>
                    </div>
                  </PopoverPanel>
                </div>
              </transition>
            </Popover>

            <a
              v-for="item in resources"
              :key="item.name"
              :href="item.href"
              class="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              {{ item.name }}
            </a>
          </PopoverGroup>
          <div class="hidden lg:flex items-center justify-end lg:flex-1 lg:w-0">
            <a
              href="#"
              class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              @click="signOut"
            >
              {{ $t('Sign out') }}
            </a>
            <!-- TODO: <a
              href="#"
              class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign up
            </a> -->
          </div>
        </div>
      </div>
      <slot name="content"></slot>
    </main>
  </Popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/vue'

import {
  BookmarkAltIcon,
  CalendarIcon,
  FlagIcon,
  HomeIcon,
  MenuIcon,
  AnnotationIcon,
} from '@heroicons/vue/outline'

import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/vue/solid'

import PageInformation from '../types/PageInformation'

import Slideout from 'slideout'

import { onMounted } from 'vue'

import { useMsal } from '../auth/useMsal'
import PageHistory from '../types/PageHistory'

const { instance } = useMsal()

const props = defineProps<{
  pageHistory: PageHistory
  enableSlideoutTouch: boolean
}>()
const isOpen = ref(false)

const panel = ref()

const slideout = ref<Slideout>()

const signOut = async () => {
  instance.logoutPopup()
}

function toggleMenu() {
  if (window.innerWidth < 1024) {
    slideout.value?.toggle()
  }
  isOpen.value = !isOpen.value
}

function panelClicked() {
  if (slideout.value?.isOpen() && window.innerWidth < 1024) {
    slideout.value?.toggle()
    isOpen.value = false
  } else if (isOpen.value && window.innerWidth >= 1024) {
    isOpen.value = false
  }
}

watch(
  () => props.enableSlideoutTouch,
  v => {
    if (v) {
      slideout.value?.enableTouch()
    } else {
      slideout.value?.disableTouch()
    }
  },
)

onMounted(() => {
  slideout.value = new Slideout({
    panel: document.getElementById('panel') as HTMLElement,
    menu: document.getElementById('menu') as HTMLElement,
    padding: 256,
    tolerance: 70,
    side: 'right',
  })

  slideout.value.on('open', function () {
    isOpen.value = true
  })

  slideout.value.on('close', function () {
    isOpen.value = false
  })

  if (props.enableSlideoutTouch) {
    slideout.value.enableTouch()
  } else {
    slideout.value.disableTouch()
  }
})

const menuItems = [
  {
    name: 'Home',
    description: 'Go to homepage',
    href: '#',
    icon: HomeIcon,
    page: '/',
  },
  {
    name: 'Scheduling',
    description: 'Select existing route or create a new one.',
    href: '#',
    icon: CalendarIcon,
    page: '/scheduling',
  },
]
const resources = [
  {
    name: 'Help Center',
    description:
      'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: BookmarkAltIcon,
  },
  {
    name: 'Guides',
    description:
      'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkAltIcon,
  },
  {
    name: 'Messages',
    description: 'See tagged samples and messages.',
    href: '#',
    icon: AnnotationIcon,
  },
  {
    name: 'Language',
    description: 'Change language of the application',
    href: '#',
    icon: FlagIcon,
  },
]
</script>

<style scoped>
.slideout-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 256px;
  min-height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: 0;
  display: none;
}

.slideout-menu-left {
  left: 0;
}

.slideout-menu-right {
  right: 0;
}

.slideout-panel {
  position: relative;
  z-index: 1;
  will-change: transform;
  background-color: #fff; /* A background-color is required */
  min-height: 100vh;
}

.slideout-open,
.slideout-open body,
.slideout-open .slideout-panel {
  overflow: hidden;
}

.slideout-open .slideout-menu {
  display: block;
}
</style>

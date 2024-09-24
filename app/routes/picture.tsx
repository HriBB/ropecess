import { MetaFunction } from '@remix-run/node'

import { Main } from '~/components/Main'
import { Picture } from '~/components/Picture'
import { getMeta } from '~/utils/meta'

import bannerImage from '~/images/home/banner.jpg?responsive'
import workPlanImage from '~/images/home/work-plan.jpg?responsive&w=300;600&img'
import accessPlanImage from '~/images/home/access-plan.jpg?responsive&w=300;600&img'
import ourServicesImage from '~/images/home/our-services.jpg?responsive&w=300;600&img'

const data = {
  meta: {
    title: 'Picture Test',
    description: 'Test the Picture component with different images',
    image: bannerImage.imageUrlFor(1200, 'jpeg'),
  },
}

export const meta: MetaFunction = () => {
  return getMeta(data.meta)
}

export default function PictureTest() {
  return (
    <Main>
      <Main.Hero>
        <Picture
          {...bannerImage}
          className="h-full w-full object-cover"
          alt="Hero Image"
          loading="eager"
          fetchPriority="high"
        />
      </Main.Hero>

      <Main.Section>
        <Main.Container>
          <Main.H2>Picture Test</Main.H2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <Picture
              {...workPlanImage}
              alt="Work Plan"
              className="w-full"
              sizes="(max-width:767px) 100vw, 33vw"
              width={300}
            />

            <Picture
              {...accessPlanImage}
              alt="Work Plan"
              className="w-full"
              sizes="(max-width:767px) 100vw, 33vw"
              width={300}
            />

            <Picture
              {...ourServicesImage}
              alt="Work Plan"
              className="w-full"
              sizes="(max-width:767px) 100vw, 33vw"
              width={300}
            />
          </div>
        </Main.Container>
      </Main.Section>
    </Main>
  )
}
